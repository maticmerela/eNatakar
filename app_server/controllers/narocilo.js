var dataJSON_menu = require('../models/menu.json');
var dataJSON_placilo = require('../models/narocilo_ponudnik.json');
//var dataJSON_menu_vse = require('../models/menu_vse.json');


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

const nalaganje = (req, res) => {
    res.render('nalaganje', { title: 'Obdelava naročila',
            style: 'styleObdelava.css',
            dodatniLinki: '<meta http-equiv="refresh" content="10;url=/narocilo/potrjen" />',
            glavaStrani: {
                naslov: 'Vaše naročilo je bilo uspešno oddano.',
                prosnja: 'Prosimo počakajte na potrditev ponudnika'
            }
        }
    );
};


/*
const menu_stranka = (req, res) => {
    res.render('menu_stranka', {
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

const menu_stranka = (req, res) => {
    // http://localhost:3000/api/5fd52cd9ebcf66acf71563ee/kosarica
    const id =req.params.id;
    axios
        .get('/api/osnovno/'+id+'/menu')
        .then((odgovor) => {

            res.render('menu_stranka', {
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







const statusNarocila = (req, res) => {
    res.render('sprejeto', {
        title: 'Status naročila',
        style: 'style_sprejeto.css',
        vsebina: {
            naslov: 'Vaše naročilo je bilo sprejeto!',
            zahvala: 'Hvala, ker ste za pomoč izbrali eNatakar.',
            racun: 'Svoj račun lahko prenesete s klikom na spodnji gumb:'
        }
    });
};

/*
const placilo2 = (req, res) => {
    axios
        .get('/api/narocilo/placilo')
        .then((odgovor) => {
            placilo(req, res);
        });
};
*/
/*const axios2 = require('axios').create({
    baseURL: apiParametri.streznik,
        timeout: 5000
});
https://app.reviewapi.io/api/v1/reviews?apikey=347aeb50-3ee5-11eb-99fc-9911387768cd&url=https%3A%2F%2Fwww.capterra.com%2Fp%2F140650%2FRecruitee&amount=2
*/




const placilo = (req, res) => {
    // http://localhost:3000/api/5fd52cd9ebcf66acf71563ee/kosarica
    const id =req.params.id;
    axios
        .get('/api/'+id+'/kosarica')
        .then((odgovor) => {

            res.render('placilo', {
                    produkt: odgovor.data,
                    title: 'placilo',
                    style: 'style_placilo.css',
                    kosarica: {
                        naslov: 'Košarica',
                        produkti: dataJSON_placilo,
                        skupaj: 'Skupaj',
                        cena: '22€'
                    },
                    placilo: {
                        naslov: 'Plačilo',
                        navodila: 'Prosimo, izpolnite spodnja polja.'
                    }
                }
            )})
        .catch(() => {
            prikaziNapako(req, res, napaka);
        });
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
    placilo,
    nalaganje,
    statusNarocila,
    menu_stranka
};

