document.addEventListener('DOMContentLoaded', function () {

    var obrazec = document.getElementById('registracijaObrazec');
    var gumb = obrazec.getElementsByClassName('gumbi')[0];

    $(gumb).click(function(event) {
        var ime = document.getElementById('ime').value;
        var priimek = document.getElementById('priimek').value;
        //var mail = document.getElementById('mail').value;
        var geslo = document.getElementById('geslo').value;
        var ulica = document.getElementById('ulica').value;
        var hisna = document.getElementById('hisna').value;
        var zip = document.getElementById('zip').value;
        var obcina = document.getElementById('obcina').value;

        // imeReg isto za ime kot za priimek
        var imeReg = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ðđĐ ,.'-]+$/
        //var mailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var gesloReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        var ulicaReg = /^[A-Za-z0-9-zčšžćđČŠŽĆĐ\- ]+$/;
        var hisnaReg = /^[1-9]{1}[0-9]{0,2}[a-zA-Z]{0,1}$/;
        var numsReg = /^[1-9]{1}[0-9]{3}$/;
        var obcinaReg = /^[A-Za-zčšžČŠŽ\-]+$/;

        var odg = '';
        var uspesno = true;
        
        if(imeReg.test(ime) === false)
        {
            odg += 'Neveljavno ime.';
            uspesno = false;
        }

        if(imeReg.test(priimek) === false)
        {
            odg += '\nNeveljaven priimek';
            uspesno = false;

        }

       /* if(mailReg.test(mail) === false)
        {
            odg += '\nNeveljaven e-poštni naslov.';
            uspesno = false;

        } */

        if(gesloReg.test(geslo) === false)
        {
            odg += '\nGeslo mora vsebovati 8 znakov, ki klučujejo velike in male znake ter številko.';
            uspesno = false;

        }

        if(ulicaReg.test(ulica) === false)
        {
            odg += '\nNeveljavno ime ulice.';
            uspesno = false;

        }

        if(hisnaReg.test(hisna) === false)
        {
            odg += '\nNeveljavna hišna številka.';
            uspesno = false;

        }

        if(numsReg.test(zip) === false)
        {
            odg += '\nNeveljaven ZIP.';
            uspesno = false;

        }

        if(obcinaReg.test(obcina) === false)
        {
            odg += '\nNeveljavno ime občine.';
            uspesno = false;

        }

        if(uspesno === false) {
            alert(odg);
            // onemogočimo osveževanje spletne strani v primeru napak pri validaciji
            event.preventDefault();
        }
    });
});