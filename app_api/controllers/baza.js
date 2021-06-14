const mongoose = require('mongoose');
const Placilo = mongoose.model('Placilo');
const Uporabnik = mongoose.model('Uporabnik');
const Ponudnik = mongoose.model('Ponudnik');
const registracijaUporabnik = require('../models/registracijaUporabnik.json');
const registracijaPonudnik = require('../models/registracijaPonudnika.json');
const narociloPonudnik = require('../models/narocilo_ponudnik.json');

function Latch(limit) {
    this.limit = limit;
    this.count = 0;
    this.waitBlock = function () {
    };
};

Latch.prototype.async = function (fn, ctx) {
    var _this = this;
    setTimeout(function () {
        fn.call(ctx, function () {
            _this.count = _this.count + 1;
            if (_this.limit <= _this.count) {
                _this.waitBlock.call(_this.waitBlockCtx);
            }
        });
    }, 0);
};

Latch.prototype.await = function (callback, ctx) {
    this.waitBlock = callback;
    this.waitBlockCtx = ctx;
};

const dodajZacetnoVsebino = (req, res, pkOdgovor) => {
    var sporocilo = "Vsebina podatkovne baze je bila uspešno dodana.";
    var barrier = new Latch(registracijaUporabnik.length + registracijaPonudnik.length + narociloPonudnik.length);

    barrier.async(function (koncano) {
        for (var  avtor of registracijaUporabnik) {
            const uporabnik = new Uporabnik();
            uporabnik.ime = avtor.ime;
            uporabnik.priimek = avtor.priimek;
            uporabnik.uporabniskoIme = avtor.uporabniskoIme;
            uporabnik.geslo = avtor.geslo;

            Uporabnik
                .findOne({uporabniskoIme: avtor.uporabniskoIme})
                .exec((napaka, najdenUporabnik) => {
                    if (!najdenUporabnik) {
                        uporabnik.save(uporabnik, (napaka, uporabnik) => {
                            if (napaka)
                                sporocilo = napaka;

                            koncano();
                        });
                    } else
                        koncano();
                });

        }
    });
    barrier.async(function (koncano) {
        for (var  avtor of registracijaPonudnik) {
            const ponudnik = new Ponudnik();
            ponudnik.ime = avtor.ime;
            ponudnik.priimek = avtor.priimek;
            ponudnik.uporabniskoIme = avtor.uporabniskoIme;
            ponudnik.geslo = avtor.geslo;
            ponudnik.obrat = avtor.obrat;
            ponudnik.tipKuhinje = avtor.tipKuhinje;
            ponudnik.ulica = avtor.ulica;
            ponudnik.hisnaSt = avtor.hisnaSt;
            ponudnik.zip = avtor.zip;
            ponudnik.obcina = avtor.obcina;
            ponudnik.menu = avtor.menu;

            Ponudnik
                .findOne({uporabniskoIme: avtor.uporabniskoIme})
                .exec((napaka, najdenUporabnik) => {
                    if (!najdenUporabnik) {
                        ponudnik.save(ponudnik, (napaka, ponudnik) => {
                            if (napaka)
                                sporocilo = napaka;

                            koncano();
                        });
                    } else
                        koncano();
                });

        }
    });

    barrier.async(function (koncano) {
        for (var  avtor of narociloPonudnik) {
            const placilo = new Placilo();
            placilo.kosarica = avtor.kosarica;
            placilo.stMize = avtor.stMize;
            placilo.opombe = avtor.opombe;
            placilo.stanje = avtor.stanje;

            Placilo
                .findOne({stMize: avtor.stMize})
                .exec((napaka, najdenUporabnik) => {
                    if (!najdenUporabnik) {
                        placilo.save(placilo, (napaka, placilo) => {
                            if (napaka)
                                sporocilo = napaka;

                            koncano();
                        });
                    } else
                        koncano();
                });

        }
    });


    // Počakamo, da se vsi vnosa vsebina shrani
    barrier.await(function () {
        res.status(200).json({"sporočilo": sporocilo});
    });
};

const izbrisiVsebino = (req, res) => {
    Uporabnik.collection.drop();
    Ponudnik.collection.drop();
    Placilo.collection.drop();

    res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."});
};

module.exports = {
    dodajZacetnoVsebino,
    izbrisiVsebino
}