/**
 * Service Worker para funcionamento Offline (PWA) - Fuzz Cafés
 */

const CACHE_NAME = 'fuzz-cafes-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/data/coffees.js',
  './js/data/methods.js',
  './js/data/presets.js',
  './js/data.js',
  './js/calculator.js',
  './js/timer.js',
  './js/app.js',
  './assets/logo-fuzz.png',
  './assets/mascot/nico-binoculars-badge.png',
  './assets/mascot/nico-pointing.png',
  './assets/mascot/nico-cup.png',
  './assets/methods/v60.png',
  './assets/methods/french-press.png',
  './assets/methods/aeropress.png',
  './assets/methods/moka.png',
  './assets/methods/melitta.png',
  './assets/methods/clever.png',
  './assets/methods/chemex.png',
  './assets/methods/cold-brew.png',
  './assets/methods/espresso.png',
  './assets/coffees/caramelo.jpg',
  './assets/coffees/frutado.jpg',
  './assets/coffees/chocolate.jpg',
  './assets/coffees/floral.jpg',
  './assets/coffees/docedeleite.jpg',
  './assets/coffees/amendoado.jpg',
  './assets/coffees/cocada.jpg',
  './assets/coffees/melancia.jpg',
  './assets/coffees/abacaxi.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usa Promise.allSettled para garantir que falhas em imagens individuais não quebrem o cache
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Aviso ao cachear asset: ${url}`, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Apenas requisições GET HTTP/HTTPS
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Ignora requisições de analytics ou externas
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Retorna do cache e tenta atualizar em background (Stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Se não estiver no cache, busca na rede
      return fetch(event.request).catch(() => {
        // Se for navegação de página e estiver offline, retorna index.html em cache
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
