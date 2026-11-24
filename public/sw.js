// Cache-first offline service worker for iPad Home Screen play.
// Once cached, the game always launches straight from the iPad even if the temporary
// orb link goes to sleep or asks to sign in to Amp.
const CACHE = 'starwillow-v18';
const FILES = [
  './', './index.html', './style.css', './game.js', './manifest.webmanifest',
  './assets/banner.jpg', './assets/bg-room.jpg', './assets/bg-garden.jpg', './assets/bg-bakery.jpg',
  './assets/bg-cauldron.jpg', './assets/bg-class.jpg', './assets/bg-shop.jpg', './assets/bg-forest.jpg',
  './assets/icon-512.png', './assets/apple-touch-icon.png',
  './assets/portrait-michelle.jpg', './assets/portrait-seoah.jpg', './assets/portrait-carrot.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function isRealGameResponse(req, res) {
  if (!res || !res.ok || res.type === 'opaqueredirect' || res.redirected) return false;
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  const path = new URL(req.url).pathname;
  if (path.endsWith('/') || path.endsWith('/index.html') || req.mode === 'navigate') {
    if (!ct.includes('text/html')) return false;
    const txt = await res.clone().text();
    // Never cache or serve an Amp sign-in or "Orb sleeping" page over the real game!
    return txt.includes('Starwillow Witch School') && txt.includes('game.js');
  }
  if (path.endsWith('.js')) return ct.includes('javascript');
  if (path.endsWith('.css')) return ct.includes('text/css');
  return true;
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request, { ignoreSearch: true })
      || (e.request.mode === 'navigate' ? await cache.match('./index.html') : null);

    // Background refresh when online; only updates cache if it's genuinely the game server (not an auth/sleep page)
    const refresh = fetch(e.request, { cache: 'no-store', redirect: 'manual' })
      .then(async res => {
        if (await isRealGameResponse(e.request, res)) {
          await cache.put(e.request, res.clone());
          return res;
        }
        return null;
      })
      .catch(() => null);

    if (cached) {
      e.waitUntil(refresh);
      return cached;
    }

    const fresh = await refresh;
    if (fresh) return fresh;
    return (await cache.match('./index.html')) || Response.error();
  })());
});
