
const CACHE = "helios-pages-v7";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./cloud.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("helios-pages-") && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// PRIJEM PUSH OBAVESTENJA
self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      title: "HELIOS — Novi servis",
      body: event.data ? event.data.text() : "Stigao je novi servis."
    };
  }

  const title = data.title || "HELIOS — Novi servis";

  const options = {
    body: data.body || "Ana je poslala novi servis.",
    data: {
      url: data.url || "./index.html"
    },
    tag: "helios-new-service",
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// KLIK NA OBAVESTENJE
self.addEventListener("notificationclick", event => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "./index.html",
    self.registration.scope
  ).href;

  event.waitUntil(
    self.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clients => {
      for (const client of clients) {
        if (client.url.startsWith(self.registration.scope)) {
          return client.focus();
        }
      }

      return self.clients.openWindow(targetUrl);
    })
  );
});

// OFFLINE I KESIRANJE
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE).then(cache =>
            cache.put(event.request, copy)
          );
        }
        return response;
      })
      .catch(() => caches.match(event.request)
        .then(cached => cached || caches.match("./index.html"))
      )
  );
});
