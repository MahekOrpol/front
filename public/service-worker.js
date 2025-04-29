const CACHE_NAME = 'crystova-cache-v1';
const STATIC_CACHE = 'crystova-static-v1';
const DYNAMIC_CACHE = 'crystova-dynamic-v1';
const API_CACHE = 'crystova-api-v1';
const IMAGE_CACHE = 'crystova-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.bundle.js',
  '/static/css/main.bundle.css',
  '/offline.html' // Fallback page for offline
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
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(API_CACHE).then(cache => cache.addAll(API_ENDPOINTS))
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

// Fetch event - handle requests with appropriate caching strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Handle API requests
  if (isApiCall(url.href)) {
    event.respondWith(
      caches.open(API_CACHE).then(cache =>
        cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response && !isCacheExpired(response, 'api') ? response : fetchPromise;
        })
      )
    );
    return;
  }

  // Handle image requests
  if (isImage(url.href)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache =>
        cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response && !isCacheExpired(response, 'images') ? response : fetchPromise;
        })
      )
    );
    return;
  }

  // Handle static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache =>
        cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response && !isCacheExpired(response, 'static') ? response : fetchPromise;
        })
      )
    );
    return;
  }

  // Network-first strategy for all other requests
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses in dynamic cache
        if (response.ok) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request).then(response => {
          return response || caches.match('/offline.html');
        });
      })
  );
}); 