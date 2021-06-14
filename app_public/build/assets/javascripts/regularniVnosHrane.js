document.addEventListener('DOMContentLoaded', function () {
    var obrazec = document.getElementById('vnosHraneObrazec');

    var gumb = obrazec.getElementsByTagName('button')[0];

    $(gumb).click(function(event) {
        var ime = document.getElementById('ime').value;
        var cena = document.getElementById('cena').value;

        var imeReg = /[\w\s]+[a-zA-ZwWčČćĆžŽšŠđĐ]/;
        var cenaReg = /[+]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/;

        var odg = '';
        var uspesno = true;
        if(imeReg.test(ime) == false)
        {
            odg = 'Prosimo vnesite ime jedi oz. pijače brez števil!';
            uspesno = false;
        }

        if(cenaReg.test(cena) == false)
        {
            odg += '\nProsimo vnesite pozitivno celo oz. decimalno število (brez enote EUR). Za zapis decimalnih števil uporabite piko!';
            uspesno = false;

        }
        if(uspesno == false) {
            alert(odg);
            // onemogočimo osveževanje spletne strani v primeru napak pri validaciji
            event.preventDefault();
        }
    });
});




