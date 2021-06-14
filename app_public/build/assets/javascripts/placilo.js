document.addEventListener('DOMContentLoaded', function () {

  /*var cenaList = document.getElementsByName('cenaPlacilo');
  var steviloList = document.getElementsByName('kolicinaPlacilo');*/

  /*var cenaList = document.getElementsByClassName('cena');
  var steviloList = document.getElementsByClassName('kolicina');*/

  var skupnavsota = 15;


/*
  for (var i = 0; i < cenaList.length; i++) {
    var cenaIzdelka = cenaList[i].innerText;
    var stIzdelkov = steviloList[i].value;

    var zmnozek = cenaIzdelka * stIzdelkov;
    skupiList[i].innerHTML = zmnozek;
  }


  for (var i = 0; i < cenaList.length; i++) {
    skupnavsota += parseInt(skupiList[i].innerText);
  }
*/
  document.getElementById("skupnaCenaPlacilo").innerHTML = skupnavsota + '€';

})
