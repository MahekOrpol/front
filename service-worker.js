const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;
const API_CACHE = `api-cache-${CACHE_VERSION}`;

// Assets to cache immediately
const STATIC_ASSETS = [
  '/offline.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/images/logo.png',
  '/static/images/offline-banner.jpg',
  '/',
  '/index.html'
];

// Cache duration in milliseconds
const CACHE_DURATION = {
  api: 5 * 60 * 1000, // 5 minutes
  images: 24 * 60 * 60 * 1000, // 24 hours
  static: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => 
        cache.addAll(STATIC_ASSETS)
      ),
      // Cache empty response for API endpoints
      caches.open(API_CACHE),
      // Cache empty response for images
      caches.open(IMAGE_CACHE)
    ]).then(() => self.skipWaiting()) // Ensure new service worker takes over immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return (
                cacheName.startsWith('static-cache-') && cacheName !== STATIC_CACHE ||
                cacheName.startsWith('dynamic-cache-') && cacheName !== DYNAMIC_CACHE ||
                cacheName.startsWith('image-cache-') && cacheName !== IMAGE_CACHE ||
                cacheName.startsWith('api-cache-') && cacheName !== API_CACHE
              );
            })
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // Clean up expired items from dynamic caches
      Promise.all([
        cleanExpiredCache(API_CACHE, CACHE_DURATION.api),
        cleanExpiredCache(IMAGE_CACHE, CACHE_DURATION.images)
      ])
    ]).then(() => self.clients.claim()) // Take control of all clients
  );
});

// Helper function to clean expired items from a cache
async function cleanExpiredCache(cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const now = Date.now();

  return Promise.all(
    requests.map(async request => {
      const response = await cache.match(request);
      const responseDate = response.headers.get('date');
      if (responseDate) {
        const date = new Date(responseDate).getTime();
        if (now - date > maxAge) {
          return cache.delete(request);
        }
      }
    })
  );
}

// Helper function to determine if a request is an API call
function isApiRequest(request) {
  return request.url.includes('/api/');
}

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);
}

// Fetch event - handle requests
self.addEventListener('fetch', event => {
  const request = event.request;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle API requests - Network first with timeout
async function handleApiRequest(request) {
  try {
    // Try network first with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), 3000)
    );
    const networkPromise = fetch(request);
    
    const response = await Promise.race([networkPromise, timeoutPromise]);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      const responseToCache = response.clone();
      cache.put(request, responseToCache);
    }
    
    return response;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache, return generic error response
    return new Response(
      JSON.stringify({ error: 'Network error. Please try again later.' }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle image requests - Cache first with network fallback
async function handleImageRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Return placeholder image if available
    return caches.match('/static/images/placeholder.png')
      .catch(() => new Response('', { status: 404 }));
  }
}

// Handle static requests - Cache first with network update
async function handleStaticRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Update cache in background
      fetch(request).then(async response => {
        if (response.ok) {
          const cache = await caches.open(STATIC_CACHE);
          return cache.put(request, response);
        }
      }).catch(() => {});
      
      return cachedResponse;
    }

    // If not in cache, fetch from network
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    return new Response('', { status: 404 });
  }
}

// Listen for push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/static/images/logo.png',
    badge: '/static/images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Crystova Jewels', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
}); 