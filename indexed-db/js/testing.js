var dbPromise = idb.open("mydatabase", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("events")) {
        upgradeDb.createObjectStore("events", {keypath:'id', autoincrement: true});
    }

    if (!upgradeDb.objectStoreNames.contains("buku")) {
        var peopleOS = upgradeDb.createObjectStore("buku", { keypath: 'id'});
        peopleOS.createIndex("judul","judul", { unique: false});
        peopleOS.createIndex("isbn", "isbn", {unique:true});
    }
});

dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    var item = {
        judul: 'Menjadi Android Developer Expert (MADE)',
        isbn: 123456789,
        description: 'Belajar pemrograman Android di dicoding dengan modul online dan buku',
        created: new Date().getTime()
    };
    store.add(item, 1823456789); // menambahkan key 'buku'
    return tx.complete;
}).then(function() {
    console.log('Buku berhasil di tambahkan');
}).catch(function() {
    console.log('Buku gagal di simpan.')
});

dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');

    //mengambil primary key
    return store.get(1823456789);
}).then(function(val) {
    console.log(val);
});

dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    return store.getAll();
}).then(function(items) {
    console.log("Data yang diambil: ");
    console.log(items);
});

dbPromise.then(function(db) {
  var tx = db.transaction('buku', 'readonly');
  var store = tx.objectStore('buku')  
  return store.openCursor();
}).then(function ambilBuku(cursor) {
    if (!cursor) {
        return;
    }
    console.log('posisi cursor: ', cursor.key);
    for (var field in cursor.value) {
        console.log(cursor.value[field])
    }
    return cursor.continue().then(ambilBuku);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}).then(function() {
    console.log('tidak ada data lain');
})

// mengambil data menggunakan range
// ambil data dengan key 10 dan seluruh data sesudahnya
IDBKeyRange.lowerBound(10);

// ambil data dengan key 10 dan seluruh data sebelumnya
IDBKeyRange.upperBound(10);

// ambil data deri key 10 sampai 100
IDBKeyRange.bound(10,100);

// ambil data yang hanya mengandung key tertentu
IDBKeyRange.only(7);

// menentukan key termasuk hitungan atau tidak
// 10 dan sesudahnya
IDBKeyRange.lowerBound(10, false);

// 11 dan sesudahnya
IDBKeyRange.lowerBound(10, true);



// update data yang sudah ada
dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readwrite');
    var store= tx.objectStore('buku');
    var item = {
        judul: 'menjadi Android Developer Expert (MADE)',
        isbn: 123456789,
        description: 'belajar pemrograman android',
        created: new Date().getTime()
    };
    store.put(item, 1823456789);
    return tx.complete;
}).then(function() {
    console.log('buku berhasil disimpan');
}).catch(function() {
    console.log('buku gagal disimpan');
});

dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    store.delete(1823456789);
    return tx.complete;
}).then(function() {
    console.log('Item deleted');
});

var dbPromise = idb.open('perpustakaan', 2, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('buku', {keyPath: 'isbn'});
        case 1:
            var bukuStore = upgradeDb.transaction.objectStore('buku');
            bukuStore.createIndex('tahun', 'tahun');
    }
})