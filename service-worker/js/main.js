if (!("serviceWorker" in navigator)) {
    console.log("service worker : Tidak di dukung oleh browser");
} else {
    navigator.serviceWorker
    .register("./sw.js")
    .then(function(resgistration) {
        console.log("Service worker : Pendaftaran berhasil, Scope :", resgistration.scope);
    })
    .catch(function(error) {
        console.log("Service worker : Pendafataran gagal. Error : ", error);
    });
}