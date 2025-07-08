
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("love-album").then(cache => {
      return cache.addAll([
        "index.html", "home.html", "album.html", "notes.html",
        "style.css", "app.js"
      ]);
    })
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
