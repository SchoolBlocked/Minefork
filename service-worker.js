self.Minefork = {
  version: 1.02
};
self.addEventListener("activate",event => {
  event.waitUntil(caches.keys().then(versions => Promise.all(versions.map(cache => {
    if (cache != Minefork.version) return caches.delete(cache);
  }))));
  event.waitUntil(clients.claim());
});
self.addEventListener("fetch",event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request).then(async response => {
      caches.open(Minefork.version).then(cache => cache.put(event.request,response));
      return response.clone();
    });
  }));
});