const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "./nav.html",
    "./index.html",
    "./pages/home.html",
    "./pages/about.html",
    "./pages/contact.html",
    "./css/materialize.min.css",
    "./js/materialize.min.js",
    "./js/nav.js"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});