document.addEventListener("DOMContentLoaded", function(){

    //Active sidebar nav
    var elems =  document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav(){
        var xhtpp = new XMLHttpRequest();
        xhtpp.onreadystatechange = function(){
            if (this.readyState == 4) {
                if (this.status != 200) return;

                //Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.innerHTML = xhtpp.responseText;
                });

                //Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm){
                    elm.addEventListener("click", function(event){
                        //Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //Muat halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhtpp.open("GET", "nav.html", true);
        xhtpp.send();
    }

    //Load page content
    var page = window.location.hash.substr(1);
    if (page == "")page="home";
    loadPage(page);

    function loadPage(page){
        var xhtpp = new XMLHttpRequest();
        xhtpp.onreadystatechange = function(){
            if(this.readyState == 4){
                var content = document.querySelector("#body-content");
                if(this.status == 200){
                    content.innerHTML = xhtpp.responseText;
                }else if(this.status == 404){
                    content.innerHTML = "<p> Halaman tidak bisa di temukan</p>";
                }else {
                    content.innerHTML = "<p> Upss.. halaman tidak bisa di akses</p>";
                }
            }
        };
        xhtpp.open("GET", "pages/"+ page + ".html", true);
        xhtpp.send();
    }
});