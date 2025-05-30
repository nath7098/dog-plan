self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pawdata-cache')
        .then(cache => cache.addAll([
            '/',
            '/favicon.ico',
            'app/assets/css/main.css'
        ]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});