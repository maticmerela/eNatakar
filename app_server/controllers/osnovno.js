//var dataJSON_kosarica = require('../models/kosarica.json');

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

const osnZaslon = (req, res) => {
    res.render('index', { title: 'eNatakar',
        style: 'styleIndex.css',
        moto: 'Prihodnost naročanja v vaših rokah!',
        navodila: 'Graf ocen restavracij:',
        napaka: 'Vaš brskalnik ne podpira video vsebin.'
    });
};

const upravljanjeBaze = (req, res) => {
    res.render('upravljanjeBaze', {
        title: 'Upravljanje baze',
    })
};

/*
const kosarica2 = (req, res) => {
    var identifikatorPlacila = req.params.id;
    axios
        .get('/api/' + identifikatorPlacila + '/kosarica')
        .then((odgovor) => {
            kosarica(req, res);
        });
};
*/

/*
const kosarica = (req, res) => {
    res.render('kosarica', {
        title: 'kosarica',
        style: 'styleKosarica.css',
        izdelki: dataJSON_kosarica
})};
*/



const kosarica = (req, res) => {
    // http://localhost:3000/api/5fd52cd9ebcf66acf71563ee/kosarica
    const id =req.params.id;
    axios
        .get('/api/'+id+'/kosarica')
        .then((odgovor) => {

            res.render('kosarica', {
                title: 'kosarica',
                style: 'styleKosarica.css',
                izdelki: odgovor.data
            })

        })

        .catch((napaka) => {
            prikaziNapako(req, res, napaka);
        });
};



const kosaricaKolicina = (req, res) => {


};




const prijava = (req, res) => {
    res.render('prijava', {
        title: 'Prijava',
        style: 'style_prijava.css',
        vsebina: {
            naslov: 'Prijava',
            bottomText: 'Še nimate eNatakar računa?',
            registracija: 'Včlanite se!'
        }
    })
};

const registracija1 = (req, res) => {
    res.render('registracijaClana', {
        title: 'Registracija Člana',
        style: 'style_regClana.css',
        vsebina: {
            naslov: 'Registracija'
        }
    });
};


const registracija2 = (req, res) => {
    res.render('registracijaPonudnika', {
            title: 'Registracija Ponudnika',
            style: 'style_regPonudnika.css',
            vsebina: {
                naslov: 'Registracija gostinskega obrata',
                uporabnik: 'Podatki o uporabniku',
                obrat: 'Podatki o gostinskem obratu',
                /*tipKuhinje: {
                        tipKuhinje1: 'Azijska',
                        tipKuhinje2: 'Burgerji',
                        tipKuhinje3: 'Brez glutena',
                        tipKuhinje4: 'Domače jedi',
                        tipKuhinje5: 'Italijanska',
                        tipKuhinje6: 'Jedi z žara',
                        tipKuhinje7: 'Mehiška',
                        tipKuhinje8: 'Morske jedi',
                        tipKuhinje9: 'Pizzerija',
                        tipKuhinje10: 'Sladko',
                        tipKuhinje11: 'Solate',
                        tipKuhinje12: 'Vegetarijanska/veganska'
                    } */
            }
        }
    );
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
    osnZaslon,
    prijava,
    registracija1,
    registracija2,
    kosarica,
    kosaricaKolicina,
    upravljanjeBaze
};
