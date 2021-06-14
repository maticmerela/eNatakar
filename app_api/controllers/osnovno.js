const mongoose = require('mongoose');
const Ponudnik = mongoose.model('Ponudnik');
const Uporabnik = mongoose.model('Uporabnik');
const Placilo = mongoose.model('Placilo');



const podatkiGraf = (req, res) => {
    Ponudnik.findOne().select('menu').exec((napaka, ponudnik) => {
        if (napaka) {
            console.log(napaka);
            res.status(404).json({"sporočilo": "Napaka pri izvedbi: " + napaka});
        }
        else {
            res.status(200).json(ponudnik);
        }
    })
}


const prvoPlacilo = (req, res) => {
    Placilo.findOne().exec((napaka, placilo) => {
        if (napaka) {
            console.log(napaka);
            res.status(404).json({"sporočilo": "Napaka pri izvedbi: " + napaka});
        }
        else {
            res.status(200).json(placilo);
        }
    })
};


const menuPrikazi = (req, res) => {
    Ponudnik
        .findById(req.params.idPonudnika)
        .exec((napaka, ponudnik) => {
            if (!ponudnik) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem ponudnika s podanim enoličnim identifikatorjem idPonudnika."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(ponudnik.menu);
        });
};

const ponudnikPosamezenPrikazi = (req, res) => {
    Ponudnik
        .findById(req.params.idPonudnika)
        .exec((napaka, ponudnik) => {
            if (!ponudnik) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem ponudnika s podanim enoličnim identifikatorjem idPonudnika."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(ponudnik);
        });
};


const dodajVKosarico = (req, res) => {
    /*
    const idPonudnika = req.params.idPonudnika;
    var naziv; var cena; var slika; var kolicina;

    if (idPonudnika) {
        Ponudnik
            .findById(idPonudnika)
            .select('menu')
            .exec((napaka, ponudnik) => {
                if (napaka) {
                    res.status(400).json(napaka);
                } else {
                    if (!ponudnik) {
                        res.status(404).json({"sporočilo": "Ne najdem ponudnika."});
                    } else {
                        ponudnik.menu.push({
                            naziv: req.body.naziv,
                            opis: req.body.opis,
                            cena: req.body.cena,
                            slika: req.body.slika
                        });
                        ponudnik.save((napaka, ponudnik) => {
                            if (napaka) {
                                res.status(400).json(napaka);
                            } else {
                                const dodaniArtikel = ponudnik.menu.slice(-1).pop();
                                res.status(201).json(dodaniArtikel);
                            }
                        });
                    }
                }
            });
    } else {
        res.status(400).json({
            "sporočilo":
                "Ne najdem ponudnika, idPonudnika je obvezen parameter."
        });
    }*/
}


const kreirajArtikel = (req, res) => {
    const idPonudnika = req.params.idPonudnika;
    if (idPonudnika) {
        Ponudnik
            .findById(idPonudnika)
            .select('menu')
            .exec((napaka, ponudnik) => {
                if (napaka) {
                    res.status(400).json(napaka);
                } else {
                    dodajArtikel(req, res, ponudnik);
                }
            });
    } else {
        res.status(400).json({
            "sporočilo":
                "Ne najdem ponudnika, idPonudnika je obvezen parameter."
        });
    }
};

const dodajArtikel = (req, res, ponudnik) => {
    if (!ponudnik) {
        res.status(404).json({"sporočilo": "Ne najdem ponudnika."});
    } else {
        ponudnik.menu.push({
            naziv: req.body.naziv,
            opis: req.body.opis,
            cena: req.body.cena,
            alergeni: req.body.alergeni.split(",").map(boolFromStringOtherwiseNull),
            slika: req.body.slika
        });
        ponudnik.save((napaka, ponudnik) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                const dodaniArtikel = ponudnik.menu.slice(-1).pop();
                res.status(201).json(dodaniArtikel);
            }
        });
    }
};


const urediArtikel = (req, res) => {
    if (!req.params.idPonudnika || !req.params.idArtikla) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem ponudnika oz. artikla, " +
                "idPonudnika in idArtikla sta obvezna parametra."
        });
    }
    Ponudnik
        .findById(req.params.idPonudnika)
        .select('menu')
        .exec((napaka, ponudnik) => {
            if (!ponudnik) {
                return res.status(404).json({"sporočilo": "Ne najdem lokacije."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (ponudnik.menu && ponudnik.menu.length > 0) {
                const trenutniArtikel = ponudnik.menu.id(req.params.idArtikla);
                if (!trenutniArtikel) {
                    res.status(404).json({"sporočilo": "Ne najdem Artikla."});
                } else {
                    trenutniArtikel.naziv = req.body.naziv;
                    trenutniArtikel.opis = req.body.opis;
                    trenutniArtikel.cena = req.body.cena;
                    trenutniArtikel.alergeni = req.body.alergeni.split(",").map(boolFromStringOtherwiseNull);
                    ponudnik.save((napaka, ponudnik) => {
                        if (napaka) {
                            res.status(404).json(napaka);
                        } else {
                            res.status(200).json(trenutniArtikel);
                        }
                    });
                }
            }
        });
};


const izbrisiArtikel = (req, res) => {
    const {idPonudnika, idArtikla} = req.params;
    if(!idPonudnika || !idArtikla) {
        return res.status(404).json({
            "sporocilo":
                "ne najdem ponudnika oz artikla" + "idPonudnika in idArtikla sta obvezna"
        })
    }
    Ponudnik
        .findById(idPonudnika)
        .select('menu')
        .exec((napaka, ponudnik) => {
            if (!ponudnik) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem menija izbranega ponudnika."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if(ponudnik.menu && ponudnik.menu.length>0) {
                ponudnik.menu.id(idArtikla).remove();
                ponudnik.save((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    } else {
                        res.status(204).json(null);
                    }
                });
            }
            else {
                res.status(404).json({"sporocilo": "Ni artikla za brisat"});
            }
        });
};



const kreirajPonudnika = (req, res) => {
    Ponudnik.create({
        ime: req.body.ime,
        priimek: req.body.priimek,
        uporabniskoIme: req.body.uporabniskoIme,
        geslo: req.body.geslo,
        obrat: req.body.obrat,
        ponudba: req.body.ponudba,
        tipKuhinje: req.body.tipKuhinje,
        ulica: req.body.ulica,
        hisnaSt: req.body.hisnaSt,
        zip: req.body.zip,
        obcina: req.body.obcina,
    }, (napaka, ponudnik) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(ponudnik);
        }
    });
};


const brisiPonudnika = (req, res) => {
    const {idPonudnika} = req.params;
    if (idPonudnika) {
        Ponudnik
            .findByIdAndRemove(idPonudnika)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem ponudnika."
        });
    }
};


const ponudnikPrikazi = (req, res) => {
    Ponudnik.find().exec((napaka, ponudnik) => {
        if (napaka) {
            console.log(napaka);
            res.status(404).json({"sporočilo": "Napaka pri izvedbi: " + napaka});
        }
        else {
            res.status(200).json(ponudnik);
        }
    })
};



const kreirajUporabnika = (req, res) => {
    Uporabnik.create({
        ime: req.body.ime,
        priimek: req.body.priimek,
        uporabniskoIme: req.body.uporabniskoIme,
        geslo: req.body.geslo
    }, (napaka, uporabnik) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(uporabnik);
        }
    });
};


const brisiUporabnika = (req, res) => {
    const {idUporabnika} = req.params;
    if (idUporabnika) {
        Uporabnik
            .findByIdAndRemove(idUporabnika)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem uporabnika."
        });
    }
};



const prikaziKosarica = (req, res) => {
    Placilo
        .findById(req.params.idPlacila)
        .exec((napaka, placilo) => {
            if (!placilo) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem placila s podanim enoličnim identifikatorjem idPlacila."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(placilo.kosarica);
        });
};


const spremeniKolicinoKosarica = (req, res) => {
    if (!req.params.idPlacila || !req.params.idArtiklaKosarica) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem lokacije oz. komentarja, " +
                "idLokacije in idKomentarja sta obvezna parametra."
        });
    }
    Placilo
        .findById(req.params.idPlacila)
        .select('kosarica')
        .exec((napaka, placilo) => {
            if (!placilo) {
                return res.status(404).json({"sporočilo": "Ne najdem lokacije."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (placilo.kosarica && placilo.kosarica.length > 0) {
                const trenutniArtikel = placilo.kosarica.id(req.params.idArtiklaKosarica);
                if (!trenutniArtikel) {
                    res.status(404).json({"sporočilo": "Ne najdem komentarja."});
                } else {
                    trenutniArtikel.kolicina = req.body.kolicina;
                    placilo.save((napaka, placilo) => {
                        if (napaka) {
                            res.status(404).json(napaka);
                        } else {
                            res.status(200).json(trenutniArtikel);
                        }
                    });
                }
            }
        });
};


const izbrisiKosarica = (req, res) => {
    const {idPlacila, idArtiklaKosarica} = req.params;
    if (!idPlacila || !idArtiklaKosarica) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem artikla, " +
                "idPlacila in idArtiklaKosarica sta obvezna parametra."
        });
    }
    Placilo
        .findById(idPlacila)
        .select('kosarica')
        .exec((napaka, placilo) => {
            if (!placilo) {
                return res.status(404).json({"sporočilo": "Ne najdem placila."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (placilo.kosarica && placilo.kosarica.length > 0) {
                if (!placilo.kosarica.id(idArtiklaKosarica)) {
                    return res.status(404).json({"sporočilo": "Ne najdem artikla."});
                } else {
                    placilo.kosarica.id(idArtiklaKosarica).remove();
                    placilo.save((napaka) => {
                        if (napaka) {
                            return res.status(500).json(napaka);
                        } else {
                            res.status(204).json(null);
                        }
                    });
                }
            } else {
                res.status(404).json({"sporočilo": "Ni komentarja za brisanje."});
            }
        });
};



function boolFromStringOtherwiseNull(s) {
    if (s == 'true') return true
    if (s == 'false') return false
    return null
}


module.exports = {
    kreirajUporabnika,
    brisiUporabnika,
    kreirajPonudnika,
    brisiPonudnika,
    spremeniKolicinoKosarica,
    izbrisiKosarica,
    prikaziKosarica,
    menuPrikazi,
    izbrisiArtikel,
    urediArtikel,
    dodajArtikel,
    kreirajArtikel,
    ponudnikPrikazi,
    podatkiGraf,
    dodajVKosarico,
    prvoPlacilo,
    ponudnikPosamezenPrikazi
};
