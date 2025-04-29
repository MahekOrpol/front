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
  '/offline.html', // Fallback page for offline
  '/static/css/main.css',
  '/static/js/main.js',
  '/Images/logo.png'
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
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests
  if (url.origin === 'https://dev.crystovajewels.com') {
    event.respondWith(handleApiRequest(event.request));
    return;
  }

  // Handle image requests
  if (isImage(url.href)) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }

  // Handle static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(event.request));
    return;
  }

  // Network-first strategy for all other requests
  event.respondWith(handleDynamicRequest(event.request));
});

// Handle API requests
async function handleApiRequest(request) {
  try {
    const cache = await caches.open(API_CACHE);
    const cachedResponse = await cache.match(request);

    // Return valid cached response
    if (cachedResponse && !isCacheExpired(cachedResponse, 'api')) {
      return cachedResponse;
    }

    // Fetch fresh data
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response(JSON.stringify({ error: 'Network error' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle image requests
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);

    // Return valid cached response
    if (cachedResponse && !isCacheExpired(cachedResponse, 'images')) {
      return cachedResponse;
    }

    // Fetch fresh image
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Image request failed:', error);
    return caches.match('/Images/placeholder.png') || new Response();
  }
}

// Handle static requests
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    // Return valid cached response
    if (cachedResponse && !isCacheExpired(cachedResponse, 'static')) {
      return cachedResponse;
    }

    // Fetch fresh static asset
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Static request failed:', error);
    return caches.match('/offline.html') || new Response();
  }
}

// Handle dynamic requests
async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Dynamic request failed:', error);
    return caches.match(request) || caches.match('/offline.html') || new Response();
  }
}

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