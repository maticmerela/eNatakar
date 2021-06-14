const mongoose = require('mongoose');
const Placilo = mongoose.model('Placilo');
//.findById(req.params.idPonudnika)

const placilo = (req, res) => {
    Placilo
        .findById(req.params.idPlacila)
        .exec((napaka, placilo) => {
            if (!placilo) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem ponudnika s podanim enoličnim identifikatorjem idPlacila."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(placilo.kosarica);
        });
};

const statusNarocila = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

const nalaganje = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

module.exports = {
    placilo,
    statusNarocila,
    nalaganje
};