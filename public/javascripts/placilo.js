document.addEventListener('DOMContentLoaded', function() {

    var cenaList = document.getElementsByName('cena');
    var kolicinaList = document.getElementsByName('kolicina');
    var skupnaVsota = 0;

    for(var i= 0; i < cenaList.length; i++) {
        var cena = cenaList[i].innerText;
        var kolicina = kolicinaList[i].innerText;

        console.log(cena); console.log(kolicina);

        skupnaVsota += cena*kolicina;
    }

    document.getElementById("skupi").innerHTML = skupnaVsota + '€';

    for(var i= 0; i < cenaList.length; i++) {
        var cena = cenaList[i];
        var kolicina = kolicinaList[i];

        cena.innerHTML += '€';
        kolicina.innerHTML += 'X';
    }



})