// Caches the whole game so it keeps working offline once opened on the iPad.
const CACHE = 'starwillow-v11';
const FILES = [
  '/', '/index.html', '/style.css', '/game.js', '/manifest.webmanifest',
  '/assets/banner.jpg', '/assets/bg-room.jpg', '/assets/bg-garden.jpg', '/assets/bg-bakery.jpg',
  '/assets/bg-cauldron.jpg', '/assets/bg-class.jpg', '/assets/bg-shop.jpg',
  '/assets/icon-512.png', '/assets/apple-touch-icon.png',
  '/assets/portrait-michelle.jpg', '/assets/portrait-seoah.jpg', '/assets/portrait-carrot.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first with a fast timeout (2s), falling back to the cached game whenever:
// 1. the iPad is offline,
// 2. the temporary orb link is asleep / slow / returns 5xx, or
// 3. the link redirects to an Amp sign-in page.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 2000);

  e.respondWith(
    fetch(e.request, { cache: 'no-store', redirect: 'manual', signal: ac.signal })
      .then(res => {
        clearTimeout(timer);
        if (!res.ok || res.type === 'opaqueredirect') {
          return caches.match(e.request, { ignoreSearch: true })
            .then(cached => cached || (e.request.mode === 'navigate' ? caches.match('/index.html') : res));
        }
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => {
        clearTimeout(timer);
        return caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('/index.html'));
      })
  );
});
