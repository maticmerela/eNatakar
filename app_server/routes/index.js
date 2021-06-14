var express = require('express');
var router = express.Router();
// const ctrlMain = require('../controllers/main');

const ctrlOsnovno = require('../controllers/osnovno');
const ctrlNarocilo = require('../controllers/narocilo');
const ctrlPonudnik = require('../controllers/ponudnik');

/* GET home page. */
// Osnovno
router.get('/', ctrlOsnovno.osnZaslon);
router.get('/prijava', ctrlOsnovno.prijava);
router.get('/registracijaClana', ctrlOsnovno.registracija1);
router.get('/registracijaPonudnika', ctrlOsnovno.registracija2);
//router.get('/kosarica/:id', ctrlOsnovno.kosarica);
router.get('/upravljanjeBaze', ctrlOsnovno.upravljanjeBaze);


router
    .route('/kosarica/:idPlacila')
    .get(ctrlOsnovno.kosarica)
    .put(ctrlOsnovno.kosaricaKolicina);





//Narocilo
router.get('/narocilo/placilo/:idPlacila', ctrlNarocilo.placilo);
router.get('/narocilo/obdelava', ctrlNarocilo.nalaganje);
router.get('/narocilo/potrjen', ctrlNarocilo.statusNarocila);
router.get('/narocilo/menu/:id', ctrlNarocilo.menu_stranka);

//Ponudnik
router.get('/ponudnik/menu/:id', ctrlPonudnik.menu_ponudnik);
router.get('/ponudnik/urediMeni', ctrlPonudnik.urediMeni);
router.get('/ponudnik/narocila', ctrlPonudnik.narocila);



module.exports = router;
