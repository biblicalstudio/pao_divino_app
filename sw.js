const CACHE_NAME = 'pao-divino-v2.1.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './css/style.css',
  './css/video-player.css',
  './sound/alarm.mp3',
  './js/recipes-data.js',
  './js/bonus_gluten_free/bonus-recipes-data.js',
  './js/sucos_detox/sucos-detox-data.js',
  './js/lanches_cafes/lanches-cafes-data.js',
  './js/videoaulas-data.js',
  './js/video-player.js',
  './assets/VideoAulas/pao_rustico/videoaulas.json',
  './js/app.js',
  './js/paywall.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

// Instalação do Service Worker e Cache dos arquivos fundamentais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de caches antigos
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

// Interceptação de requisições: Cache First com fallback de rede
self.addEventListener('fetch', (event) => {
  // Ignora requisições não-GET e chrome-extension
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  // STREAMING PROGRESSIVO INSTANTÂNEO DE VÍDEOS:
  // Vídeos usam Range Requests (HTTP 206) para carregar aos poucos.
  // Deixa o navegador fazer streaming direto pela rede sem esperar baixar o arquivo inteiro.
  if (event.request.headers.get('range') || event.request.url.match(/\.(mp4|webm|m4v|ogv)$/i)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Tenta atualizar em segundo plano (stale-while-revalidate para recursos do app)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {
          // offline, ignore
        });
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Se falhar e for navegação, devolve o index do cache
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Controle de Notificação e Parada do Alarme pela Barra de Notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Envia mensagem para a janela parar o alarme
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({ type: 'STOP_ALARM' });
      });

      // Se não for apenas parar pela ação e sim toque na notificação, foca a janela
      if (event.action !== 'stop-alarm' && clientList.length > 0) {
        return clientList[0].focus();
      }
    })
  );
});

