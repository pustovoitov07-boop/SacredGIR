// sw.js — менять байт при каждом деплое (хотя бы комментарий внизу),
// иначе браузер не увидит «новую версию» воркера.
self.addEventListener('install', function (e) {
  self.skipWaiting(); // активировать новую версию немедленно
});
self.addEventListener('activate', function (e) {
  e.waitUntil(clients.claim()); // взять под контроль уже открытые вкладки
});
self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
// сеть-первый для HTML, кэш для статики
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request).catch(function () { return caches.match(e.request); })
    );
  }
});
