document.addEventListener('DOMContentLoaded', function() {

    var cenaList = document.getElementsByName('cena');
    var steviloList = document.getElementsByName('kok');
    var skupiList = document.getElementsByName('skupi');
    var skupnavsota = 0;


    for(var i= 0; i < cenaList.length; i++) {
        var cenaIzdelka = cenaList[i].innerText;
        var stIzdelkov = steviloList[i].value;

        var zmnozek = cenaIzdelka*stIzdelkov;
        skupiList[i].innerHTML = zmnozek;
    }


    for(var i= 0; i < cenaList.length; i++) {
        skupnavsota += parseInt(skupiList[i].innerText);
    }

    document.getElementById("skupnaCena").innerHTML = skupnavsota + '€';




    document.addEventListener("click", function(){

        for(var i= 0; i < cenaList.length; i++) {
            var stIzdelkov = steviloList[i].value;
            var cenaIzdelka = cenaList[i].innerText;

            var zmnozek = cenaIzdelka*stIzdelkov;
            skupiList[i].innerHTML = zmnozek;
        }


        skupnavsota = 0;

        for(var i= 0; i < cenaList.length; i++) {
            skupnavsota += parseInt(skupiList[i].innerText);
        }

        document.getElementById("skupnaCena").innerHTML = skupnavsota + '€';
    });
})
