document.addEventListener('DOMContentLoaded', function () {

    var obrazec = document.getElementById('kreirajUporabnika');
    var gumb = obrazec.getElementsByClassName('gumbi')[0];

    $(gumb).click(function(event) {
        var ime = document.getElementById('ime').value;
        var priimek = document.getElementById('priimek').value;
        var datum = document.getElementById('datum').value;
        var mail = document.getElementById('mail').value;
        var geslo = document.getElementById('geslo').value;

// imeReg isto za ime kot za priimek
        var imeReg = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðđ ,.'-]+$/
        var mailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var gesloReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        var odg = '';
        var uspesno = true;
        if(imeReg.test(ime) === false)
        {
            odg = 'Neveljavno ime.';
            uspesno = false;
        }

        if(imeReg.test(priimek) === false)
        {
            odg += '\nNeveljaven priimek.';
            uspesno = false;

        }

        //datum
        var leto = '';
        for (var i = 0; i < 4; i++) {
            leto += datum[i];
        }

        var mesec = '';
        for (var j = 5; j < 7; j++) {
            mesec += datum[j];
        }

        var dan = '';
        for (var k = 8; k < 10; k++) {
            dan += datum[k];
        }


        var danes = new Date();

        if (danes.getFullYear() < leto) {
            odg += '\nNeveljaven datum.';
            uspesno = false;
        } else if (danes.getFullYear() == leto) {
            if ((danes.getMonth() + 1) < mesec) {
                odg += '\nNeveljaven datum.';
                uspesno = false;
            } else if ((danes.getMonth() + 1) == mesec) {
                if (danes.getDate() < dan) {
                    odg += '\nNeveljaven datum.';
                    uspesno = false;
                }
            }
        }

        if(mailReg.test(mail) === false)
        {
            odg += '\nNeveljaven e-poštni naslov.';
            uspesno = false;

        }

        if(gesloReg.test(geslo) === false)
        {
            odg += '\nGeslo mora biti dolgo vsaj 8 znakov in vsebovati velike, male črke ter številke.';
            uspesno = false;

        }

        if(uspesno === false) {
            alert(odg);
            // onemogočimo osveževanje spletne strani v primeru napak pri validaciji
            event.preventDefault();
        }
    });
});
