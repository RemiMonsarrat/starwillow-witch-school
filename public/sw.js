// Caches the whole game so it keeps working offline once opened on the iPad.
const CACHE = 'starwillow-v4';
const FILES = [
  '/', '/index.html', '/style.css', '/game.js', '/manifest.webmanifest',
  '/assets/banner.jpg', '/assets/icon-512.png', '/assets/apple-touch-icon.png',
  '/assets/portrait-michelle.jpg', '/assets/portrait-seoah.jpg', '/assets/portrait-carrot.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first so updates arrive when online; fall back to the cache when offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('/index.html')))
  );
});
