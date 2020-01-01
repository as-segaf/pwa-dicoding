var base_url = "https://readerapi.codepolitan.com/";

// blok code yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // method reject akan akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // mengubah suatu objek menjadi promise agar bisa di then-kan
        return Promise.resolve(response);
    }
}

// parsing data json menjadi array javascript
function json(response) {
    return response.json();
}

// blok catch error
function error(error) {
    // parameter berasal dari promise.reject
    console.log('Error : ' + error);
}

function getArticles() {

    if ('caches' in window) {
        caches.match(base_url + "articles").then(function(response) {
            if (response) {
                response.json().then(function (data) {
                    var articlesHTML = "";
                    data.result.forEach(function (article) {
                        articlesHTML += `
                        <div class="card">
                            <a href="./article.html?id=${article.id}">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${article.thumbnail}"/>
                                </div>
                            </a>
                            <div class="card-content">
                                <span class="card-title truncate">${article.title}</span>
                                <p>${article.description}</p>
                            </div>
                        </div>
                        `;
                    });
                    // sisipkan componen card ke dalam elemen dengan id #content
                    document.getElementById("articles").innerHTML = articlesHTML;
                })
            }
        })
    }

    fetch(base_url + "articles")
    .then(status)
    .then(json)
    .then(function(data) {
         // Menyusun komponen card artikel secara dinamis
        var articlesHTML = "";
        data.result.forEach(function(article) {
            articlesHTML += `
                <div class="card">
                    <a href="./article.html?id=${article.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.thumbnail}" />
                    </div>
                    </a>
                    <div class="card-content">
                    <span class="card-title truncate">${article.title}</span>
                    <p>${article.description}</p>
                    </div>
                </div>
                `;
    });
    // sisipkan 
    document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
    // ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data){
            var articleHTML = `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.result.cover}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.result.post_title}</span>
                    ${snarkdown(data.result.post_content)}
                  </div>
                </div>
              `;
              // sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("body-content").innerHTML = articleHTML;
              // kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
          });
        }
      });
    }

    fetch(base_url + "article/" + idParam)
     .then(status)
     .then(json)
     .then(function(data) {
       var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.result.cover}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.result.post_title}</span>
              ${snarkdown(data.result.post_content)}
            </div>
          </div>
        `;
        // sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
     });
  });
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function(article) {
      var description = article.post_content.substring(0,100);
      articlesHTML += `
                 <div class="card">
                    <a href="./article.html?id=${article.ID}">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${article.cover}">
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title truncate">${article.post_title}</span>
                        <p>${description}</p>
                    </div>
                </div>
      `;
    });
    // sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}