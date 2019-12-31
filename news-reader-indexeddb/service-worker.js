const CACHE_NAME = "newsreader";
var urlsToCache = [
    "/",
    "./nav.html",
    "./index.html",
    "./article.html",
    "./pages/home.html",
    "./pages/about.html",
    "./pages/contact.html",
    "./css/materialize.min.css",
    "./js/materialize.min.js",
    "./js/nav.js",
    "./js/api.js",
    "icon.png",
    "./manifest.json"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if (cacheName != CACHE_NAME) {
                        console.log("Service worker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// self.addEventListener("fetch", function(event){
//     event.respondWith(
//         caches
//             .match(event.request, { cacheName: CACHE_NAME })
//             .then(function (response) {
//                 if (response) {
//                     console.log("Service Worker: Gunakan asset dari cache: ", response.url);
//                     return response;
//                 }

//                 console.log(
//                     "Service Worker: Memuat asset dari server: ",
//                     event.request.url
//                 );
//                 return fetch(event.request);
//             })
//     );
// });


self.addEventListener("fetch", function(event) {
    var base_url = "https://readerapi.codepolitan.com/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true}).then(function(response){
                return response || fetch (event.request);
            })
        )
    }
});