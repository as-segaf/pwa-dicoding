var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    var aritclesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "ID"
    });
    aritclesObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
})

function saveForLater(article) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        console.log(article);
        store.add(article.result);
        return tx.complete;
    })
    .then(function() {
        console.log("artikel berhasil disimpan");
    });
}

function getAll() {
    return new Promise(function(resolve,reject) {
        dbPromised
         .then(function(db) {
             var tx = db.transaction("articles", "readonly");
             var store = tx.objectStore("articles");
             return store.getAll();
         })
         .then(function(articles) {
             resolve(articles);
         });
    });
}