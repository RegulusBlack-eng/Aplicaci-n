const CACHE_NAME = 'techfix-cache-v1';
const assets = [
  './index.html',
  './manifest.json'
];

// Instalar el Service Worker y cachear la estructura básica
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Interceptar peticiones para que cargue rápido la interfaz
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
