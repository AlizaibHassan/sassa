const CACHE_NAME = 'sassa-cache-v1';
const OFFLINE_PAGE = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/apple-touch-icon.png',
];

// Cache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-first strategy with offline fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(async () => {
        // Try to get from cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_PAGE);
        }

        return new Response('Network error happened', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' },
        });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-data-sync') {
    event.waitUntil(syncFormData());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/android-chrome-192x192.png',
    badge: '/icons/badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (const client of windowClients) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window/tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

async function syncFormData() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const formRequests = requests.filter(request => 
      request.url.includes('/api/') && request.method === 'POST'
    );

    await Promise.all(formRequests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        console.error('Sync failed for request:', request.url);
      }
    }));
  } catch (error) {
    console.error('Form data sync failed:', error);
  }
}