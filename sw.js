// Subir VERSION en cada publicación: así el teléfono descarta la caché vieja.
const VERSION = '2.0.0';
const CACHE_NAME = `bodega-scanner-${VERSION}`;
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './zxing.min.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
// Con señal débil la red puede tardar mucho: pasado este tiempo se usa la copia guardada.
const NETWORK_TIMEOUT_MS = 3000;

const scopeUrl = (path) => new URL(path, self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // cache: 'reload' evita guardar una copia vieja que tenga el navegador
      cache.addAll(ASSETS_TO_CACHE.map((url) => new Request(url, { cache: 'reload' })))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms, null));
}

// Página: red primero (para recibir actualizaciones), copia guardada si no hay red o tarda.
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  const network = fetch(request).then((response) => {
    if (response && response.ok) cache.put(scopeUrl('./index.html'), response.clone());
    return response;
  }).catch(() => null);

  const first = await Promise.race([network, timeout(NETWORK_TIMEOUT_MS)]);
  if (first) return first;

  const cached = await cache.match(scopeUrl('./index.html')) || await cache.match(scopeUrl('./'));
  if (cached) return cached;

  // Sin copia guardada: esperar a la red lo que tarde
  const late = await network;
  return late || new Response('<h1>Sin conexión</h1><p>Abre la app una vez con internet para poder usarla sin cobertura.</p>', {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// Archivos estáticos: copia guardada al instante y se refresca en segundo plano.
async function handleAsset(event) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(event.request, { ignoreSearch: true });
  const network = fetch(event.request).then((response) => {
    if (response && response.ok) cache.put(event.request, response.clone());
    return response;
  }).catch(() => null);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return (await network) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else {
    event.respondWith(handleAsset(event));
  }
});
