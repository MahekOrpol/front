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
  '/offline.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/Images/logo.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
  'https://dev.crystovajewels.com/api/v1/product/getTopRated',
  'https://dev.crystovajewels.com/api/v1/product/getBestSelling',
  'https://dev.crystovajewels.com/api/v1/product/getOnSale',
  'https://dev.crystovajewels.com/api/v1/product',
  'https://dev.crystovajewels.com/api/v1/category/get'
];
// Cache duration in seconds
const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60,   // 30 days
  dynamic: 7 * 24 * 60 * 60,   // 7 days
  api: 60 * 60,                // 1 hour
  images: 14 * 24 * 60 * 60    // 14 days
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
// Activate event - clean up old caches and expired entries
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      await cleanupCaches(); // clean expired entries
      const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE, IMAGE_CACHE];
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName =>
            cacheName.startsWith('crystova-') && !validCaches.includes(cacheName)
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })()
  );
  self.clients.claim();
});
// Fetch event handler
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.origin === 'https://dev.crystovajewels.com') {
    event.respondWith(handleApiRequest(event.request));
  } else if (isImage(url.href)) {
    event.respondWith(handleImageRequest(event.request));
  } else if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(event.request));
  } else {
    event.respondWith(handleDynamicRequest(event.request));
  }
});
// --- Utility functions ---
const isApiCall = url => API_ENDPOINTS.some(endpoint => url.includes(endpoint));
const isImage = url => /\.(jpg|jpeg|png|gif|webp|svg)$/.test(url);
const isCacheExpired = (response, type) => {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return true;
  const cachedTime = new Date(dateHeader).getTime();
  const currentTime = new Date().getTime();
  const age = (currentTime - cachedTime) / 1000;
  return age > CACHE_DURATION[type];
};
const safeCacheResponse = async (cache, request, response) => {
  if (!response || !response.ok || response.status === 206) return response;
  try {
    await cache.put(request, response.clone());
  } catch (err) {
    console.warn('Cache put failed:', err);
  }
  return response;
};
// --- Request Handlers ---
async function handleApiRequest(request) {
  try {
    const cache = await caches.open(API_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isCacheExpired(cachedResponse, 'api')) {
      return cachedResponse;
    }
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('API fetch error:', error);
    const fallback = await caches.match(request);
    return fallback || new Response(JSON.stringify({ error: 'Network error' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isCacheExpired(cachedResponse, 'images')) {
      return cachedResponse;
    }
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Image fetch error:', error);
    return caches.match('/Images/placeholder.png') || new Response();
  }
}
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isCacheExpired(cachedResponse, 'static')) {
      return cachedResponse;
    }
    const response = await fetch(request);
    if (response.ok) {
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Static fetch error:', error);
    return caches.match('/offline.html') || new Response();
  }
}
async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await safeCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Dynamic fetch error:', error);
    return caches.match(request) || caches.match('/offline.html') || new Response();
  }
}
// --- Cleanup expired cache entries ---
async function cleanupCaches() {
  try {
    const cacheNames = [API_CACHE, IMAGE_CACHE, DYNAMIC_CACHE];
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const requests = await cache.keys();
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const type = name.includes('api') ? 'api' :
                       name.includes('image') ? 'images' : 'dynamic';
          if (isCacheExpired(response, type)) {
            await cache.delete(request);
          }
        }
      }
    }
  } catch (err) {
    console.error('Cache cleanup error:', err);
  }
}