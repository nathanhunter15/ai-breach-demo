/*
  THE SERVICE WORKER — and it exists for the autoplay policy before it exists
  for offline.

  [NH] "for the browser do research and find a way to start the music directly."

  There are exactly two ways a page is allowed to start audio without a click,
  and both come from Chrome's autoplay policy rather than from anything a page
  can do on its own:

    THE MEDIA ENGAGEMENT INDEX, which builds up on its own. Chrome counts
    unmuted playback over seven seconds per origin, Web Audio has counted toward
    it since Chrome 70, and once the score is high enough autoplay is simply
    allowed. Desktop only, nothing to implement, and it is why the music starts
    with no gesture on a machine that has played this a few times and not on a
    first visit.

    AN INSTALLED APP. A site the user has installed — desktop, or added to a
    home screen — is exempt from the gesture requirement outright. That one IS
    implementable, and this file plus `manifest.webmanifest` is the whole of it:
    Chrome will not offer to install a page that has no service worker with a
    fetch handler.

  So the point of this file is the install prompt. The offline caching below is
  the thing it may as well do while it is here, and it is worth having on its
  own terms — this build is sixty-nine megabytes, most of it music, and a
  player on a bad connection should pay for that once.

  ── THE ONE RULE THAT MATTERS ──────────────────────────────────────────────

  NEVER CACHE-FIRST SOMETHING THAT IS NOT CONTENT-HASHED. `assets/` is written
  by Vite with a hash in every filename, so a byte that changes gets a new name
  and an old name can be trusted forever. Everything else — the HTML, the
  manifest, the art under `title/` — keeps its name across builds, so a
  cache-first rule on any of it means shipping an update that some players
  never see and cannot force. Those go network-first and fall back to the cache
  only when the network is genuinely gone.

  `skipWaiting` and `clients.claim` for the same reason: a new worker takes over
  on the next load rather than waiting for every tab to close, because "close
  all tabs to get the fix" is not something anybody is going to do.
*/

const VERSION = 'breach-3';
const SHELL = `${VERSION}-shell`;
const IMMUTABLE = `${VERSION}-assets`;

self.addEventListener('install', () => {
  void self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Anything from an older VERSION is dead the moment this one activates.
      const names = await caches.keys();
      await Promise.all(names.filter((n) => !n.startsWith(VERSION)).map((n) => caches.delete(n)));
      await self.clients.claim();
    })(),
  );
});

/** Content-hashed, therefore safe to keep forever. See the header. */
function immutable(url) {
  return url.pathname.includes('/assets/');
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Same origin only. A cross-origin font or API is not this worker's business
  // and opaque responses in a cache are a way to fill a disk quota silently.
  if (url.origin !== self.location.origin) return;

  if (immutable(url)) {
    event.respondWith(
      (async () => {
        const hit = await caches.match(request);
        if (hit !== undefined) return hit;
        const res = await fetch(request);
        if (res.ok) {
          const cache = await caches.open(IMMUTABLE);
          void cache.put(request, res.clone());
        }
        return res;
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const res = await fetch(request);
        if (res.ok) {
          const cache = await caches.open(SHELL);
          void cache.put(request, res.clone());
        }
        return res;
      } catch (err) {
        // Offline. Whatever was seen last is better than a browser error page,
        // and for a navigation the start page is better than nothing at all.
        const hit = await caches.match(request);
        if (hit !== undefined) return hit;
        if (request.mode === 'navigate') {
          const shell = await caches.match('./index.html');
          if (shell !== undefined) return shell;
        }
        throw err;
      }
    })(),
  );
});
