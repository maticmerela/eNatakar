document.addEventListener('DOMContentLoaded', function () {
   
    var forma = document.getElementById('placiloObrazec');

    var btn = forma.getElementsByTagName('button')[0];

  
    $(btn).click(function (event) {
        var ime = document.getElementById('ime').value;
        var kartica = document.getElementById('kartica').value;
        var cvv = document.getElementById('cvv').value;
        var imeReg = /^([a-zA-ZwčćžšđČĆŽĐŠ]{2,}\s[a-zA-ZwčćžšđČĆŽĐŠ]{1,}'?-?[a-zA-ZwčćžšđČĆŽĐŠ]{2,}\s?([a-zA-ZwčćžšđČĆŽĐŠ]{1,})?)/;
        var karticaReg = /^(\d{4} ){3}\d{4}$/;
        var cvvReg = /^[0-9]{3}$/;
        var odg = '';
        var uspesno = true;
        if(imeReg.test(ime) == false)
        {
            odg = 'Prosimo, vnesite ime in priimek po vzorcu: Janez Novak';
            uspesno = false;
        }
    
        if(karticaReg.test(kartica) == false)
        {
            odg += '\nProsimo, vnesite številko kartice po vzorcu: 0000 0000 0000 0000';
            uspesno = false;
    
        }
        if(cvvReg.test(cvv) == false)
        {
            odg += '\nProsimo, vnesite CVV številko po vzorcu: 000';
            uspesno = false;
    
        }
        if(uspesno == false) {
                alert(odg);
              
            
             // onemogočimo osveževanje spletne strani v primeru napak pri validaciji
            event.preventDefault();
        } 
        
        
    });
});


