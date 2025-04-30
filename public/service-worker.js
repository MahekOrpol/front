const CACHE_NAME = 'crystova-cache-v1';
const STATIC_CACHE = 'crystova-static-v1';
const DYNAMIC_CACHE = 'crystova-dynamic-v1';
const API_CACHE = 'crystova-api-v1';
const IMAGE_CACHE = 'crystova-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.chunk.css',
  '/static/js/main.chunk.js',
  '/main-logo.png',
  '/manifest.json',
  '/offline.html'
];

// API endpoints to cache
const API_ENDPOINTS = [
  'https://dev.crystovajewels.com/api/v1/product/getTopRated',
  'https://dev.crystovajewels.com/api/v1/product/getBestSelling',
  'https://dev.crystovajewels.com/api/v1/product/getOnSale',
  'https://dev.crystovajewels.com/api/v1/category/get'
];

// Cache duration in seconds
const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60, // 30 days
  dynamic: 7 * 24 * 60 * 60, // 7 days
  api: 60 * 60, // 1 hour
  images: 14 * 24 * 60 * 60 // 14 days
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(API_CACHE)
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName.startsWith('crystova-') && 
            ![STATIC_CACHE, DYNAMIC_CACHE, API_CACHE, IMAGE_CACHE].includes(cacheName)
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Helper function to check if URL is an API call
const isApiCall = url => API_ENDPOINTS.some(endpoint => url.includes(endpoint));

// Helper function to check if URL is an image
const isImage = url => /\.(jpg|jpeg|png|gif|webp|svg)$/.test(url);

// Helper function to check if cache is expired
const isCacheExpired = (response, type) => {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return true;

  const cachedDate = new Date(dateHeader).getTime();
  const now = new Date().getTime();
  const age = (now - cachedDate) / 1000; // Convert to seconds
  return age > CACHE_DURATION[type];
};

// Helper function to safely cache a response
const safeCacheResponse = async (cache, request, response) => {
  // Don't cache partial responses or failed responses
  if (!response || !response.ok || response.status === 206) {
    return response;
  }

  try {
    await cache.put(request, response.clone());
  } catch (error) {
    console.warn('Failed to cache response:', error);
  }

  return response;
};

// Fetch event handler
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Network-first strategy for API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first strategy for static assets
  if (
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
    );
    return;
  }

  // Network-first strategy for everything else
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((response) => {
            if (response) return response;
            
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'syncData') {
    event.waitUntil(
      // Implement your sync logic here
      Promise.resolve()
    );
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/main-logo.png',
    badge: '/main-logo.png'
  };

  event.waitUntil(
    self.registration.showNotification('Crystova Jewels', options)
  );
});

// Periodic cache cleanup
setInterval(async () => {
  try {
    const cacheNames = [API_CACHE, IMAGE_CACHE, DYNAMIC_CACHE];
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const type = cacheName.includes('api') ? 'api' : 
                      cacheName.includes('image') ? 'images' : 'dynamic';
          
          if (isCacheExpired(response, type)) {
            await cache.delete(request);
          }
        }
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}, 60 * 60 * 1000); // Run cleanup every hour 