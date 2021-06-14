var dataJSON_narociloP = require('../models/sprejemNarocil.json');
var dataJSON_menu_vse = require('../models/menu_vse.json');
var dataJSON_menu = require('../models/menu.json');
// module.exports.narocila = function(req, res) {
//     res.render('narocilo_ponudnik', dataJSON_narociloP); };

var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};

if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://enatakar.herokuapp.com/';
}
const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});


/*
const menu_ponudnik = (req, res) => {
    res.render('menu_ponudnik', {
        title: 'Menu',
        style: 'styleMenu.css',
        glavaStrani: {
            naslov: 'Bisto Satem',
            podnaslov: 'Prepustite razvajanje svojih brbončic ekipi Bistroja Satem in dovolite da Vas popeljemo na kulinarično popotovanje',
            ocena: '4'
        },

        mostPopular: {
            keyword: 'Najbolj priljubljene jedi',
            artikel: dataJSON_menu},

        menuVse: {
            keyword: 'Menu',
            artikel: dataJSON_menu_vse}});
};
*/

const menu_ponudnik = (req, res) => {
    // http://localhost:3000/api/5fd52cd9ebcf66acf71563ee/kosarica
    const id =req.params.id;
    axios
        .get('/api/osnovno/'+id+'/menu')
        .then((odgovor) => {

            res.render('menu_ponudnik', {
                title: 'Menu',
                style: 'styleMenu.css',
                glavaStrani: {
                    naslov: 'Bisto Satem',
                    podnaslov: 'Prepustite razvajanje svojih brbončic ekipi Bistroja Satem in dovolite da Vas popeljemo na kulinarično popotovanje',
                    ocena: '4'
                },

                mostPopular: {
                    keyword: 'Najbolj priljubljene jedi',
                    artikel: dataJSON_menu
                },

                menuVse: {
                    keyword: 'Menu',
                    artikel: odgovor.data
                }
            })
        })

        .catch(() => {
            prikaziNapako(req, res, napaka);
        });
};


const urediMeni = (req, res) => {
    res.render('vnosHrane', { title: 'Uredi meni',
        style: 'styleVnosHrane.css',
        naslov: 'Vnos novega artikla na meni',
        navodila: {
            vrsta: '*Izberite vrsto jedi!',
            ime: '*Ime jedi oz. pijače',
            cena: '*Cena jedi oz. pijače:',
            slika: 'Dodajte sliko jedi oz. pijače',
            opis: 'Opis jedi:',
            alergeni: '*Označite alergene, ki jih vsebuje jed oz. pijača',
            obvezno: 'Polja označena z * je potrebno obvezno izpolniti!',
            alergeniSeznam: {
                gluten: 'gluten',
                raki: 'raki/ribe/mehkužci',
                jajca: 'jajca',
                arasidi: 'arašidi',
                laktoza: 'laktoza',
                soja: 'soja',
                orescki: 'oreščki',
                zelena: 'listnata zelena',
                gorcica: 'gorčično seme',
                sezam: 'sezamovo seme',
                dioksid: 'žveplov dioksid in sulfiti',
                bob: 'volčji bob',
                brez: 'jed ne vsebuje alergenov'
            }
        }
    });
};


const narocila2 = (req, res) => {
    axios
        .get('/api/narocilo/potrjen')
        .then((odgovor) => {
            kosarica(req, res);
        });
};


const narocila = (req, res) => {
    res.render('narocila', {
        title: 'narocila',
        style: 'style_narocilo.css',
        naslov: 'Naročila',
        glavaTabele: {
            stolpec1: 'Oznaka mize',
            stolpec2: 'Vsebina naročila',
            stolpec3: 'Opombe',
            stolpec4: 'Ime naročnika',
            stolpec5: 'Stanje naročila'
        },
        narocila: dataJSON_narociloP})
};

const prikaziNapako = (req, res, napaka) => {
    let naslov = "Nekaj je šlo narobe!";
    let vsebina = napaka.isAxiosError ?
        "Napaka pri dostopu do oddaljenega vira preko REST API dostopa!" :
        undefined;
    vsebina = (
        vsebina != undefined &&
        napaka.response && napaka.response.data["sporočilo"]
    ) ? napaka.response.data["sporočilo"] : vsebina;
    vsebina = (
        vsebina != undefined &&
        napaka.response && napaka.response.data["message"]
    ) ? napaka.response.data["message"] : vsebina;
    vsebina = (vsebina == undefined) ?
        "Nekaj nekje očitno ne deluje." : vsebina;
    res.render('genericno-besedilo', {
        title: naslov,
        vsebina: vsebina
    });
};

module.exports = {
    menu_ponudnik,
    urediMeni,
    narocila
};