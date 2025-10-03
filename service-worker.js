const CACHE_NAME = "mi-pwa-cache-v2"; // Cambié versión para forzar actualización
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/flower_9591214.png",
  "/icons/heart_11113988.png",
  // Puedes agregar más archivos estáticos aquí
];

// INSTALACIÓN → Guardar App Shell en caché
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando y cacheando App Shell...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ACTIVACIÓN → Limpiar cachés antiguos
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activando y limpiando caches antiguos...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Eliminando cache antigua:", key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH → Cache first, luego red, con fallback offline
self.addEventListener("fetch", (event) => {
  // Solo manejamos solicitudes GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Devuelve cache primero
        return cachedResponse;
      }

      // Si no está en cache, ir a la red
      return fetch(event.request)
        .then((networkResponse) => {
          // Solo cachear respuestas válidas
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }

          // Clonar y guardar en cache
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Fallback offline si hay un archivo offline.html
          return caches.match("/offline.html");
        });
    })
  );
});
