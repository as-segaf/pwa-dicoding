CACHE_NAME = "codepolitan_reader_lite";
urlsToCache = [
    "/",
    "./index.html",
    "./img/codepolitan-logo.png",
    "./js/main.js"
]

self.addEventListener("install", function(event) {
    console.log("service worker: Menginstall.....");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("service worker: Membuka cache.....");
            return cache.addAll(urlsToCache);
        })
    );
});

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function(response) {
//             console.log("serviceWorker: Menarik data : ", event.request.url);

//             if (response) {
//                 console.log("Service worker : Gunakan asset dari cache : ", response.url);
//                 return response;
//             }

//             console.log("service worker: memuat asset dari server: " , event.request.url);
//             return fetch(event.request);
//         })
//     );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {cacheName:CACHE_NAME})
        .then(function(response) {
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});