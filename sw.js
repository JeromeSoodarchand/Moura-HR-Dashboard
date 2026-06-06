// SolentraHR Service Worker
const CACHE_NAME = 'solentrahr-v1';

// Don't cache anything - always fetch fresh
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Clear all old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // For HTML pages - always go to network, never cache
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // For everything else - network first
  e.respondWith(fetch(e.request));
});
