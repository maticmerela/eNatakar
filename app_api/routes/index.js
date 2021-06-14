const express = require('express');
const router = express.Router();
const ctrlOsnovno = require('../controllers/osnovno.js');
const ctrlNarocilo = require('../controllers/narocilo.js');
var ctrlBaza = require('../controllers/baza.js')
//const ctrlPonudnik = require('../controllers/ponudnik.js');

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Osnovno
 *    description: Obvladovanje osnovne strani in menijev
 *  - name: Narocilo
 *    description: Obvladovanje narocila
 *  - name: Avtentikacija
 *    description: Obvladovanje uporabnikov
 */

// //narocila
//ne potrebujemo idPonudnika,ker ima vsak artikel tko al tko enolični id
/**
 * @swagger
 *  /menu/{idPonudnika}/menu:
 *   get:
 *    summary: Prikaz menija glede na **id ponudnika**.
 *    description:
 *    tags: [Osnovno]
 *    parameters:
 *     - in: query
 *       name: idPonudnika
 *       description:
 *       schema:
 *        type: string
 *       required: true
 *       example: 5fdfa1d3bbfda64a4442e7f5
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z artikli na meniju restavracije v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/MenuPrikazi"
 *     "404":
 *      description: Napaka zahteve, zahtevanega menuja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemPonudnika"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
 router.get('/osnovno/:idPonudnika/menu', ctrlOsnovno.menuPrikazi);

/**
 * @swagger
 *  /menu/{idPonudnika}/menu:
 *   get:
 *    summary: Prikaz menija glede na **id ponudnika**.
 *    description:
 *    tags: [Osnovno]
 *    parameters:
 *     - in: query
 *       name: idPonudnika
 *       description:
 *       schema:
 *        type: string
 *       required: true
 *       example: 5fdfa1d3bbfda64a4442e7f5
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z artikli na meniju restavracije v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/MenuPrikazi"
 *     "404":
 *      description: Napaka zahteve, zahtevanega menuja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemPonudnika"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
 router.get('/osnovno/:idPonudnika/posamezen', ctrlOsnovno.ponudnikPosamezenPrikazi);

/**
 * @swagger
 *  /{idPonudnika}/kosaricaIzbrisi/{idArtikla}:
 *   delete:
 *    summary: Brisanje artikla iz menija ponudnika
 *    description: Brisanje **izbranega artikla** iz ponudnik.
 *    tags: [Osnovno]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPonudnika
 *       description: enolični identifikator ponudnika
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idArtikla
 *       description: enolični identifikator artikla
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan artikel iz menija.
 *      content:
 *       application/json:
 *        examples:
 *         ne najdem artikla:
 *          $ref: "#/components/examples/ArtikelIzbrisan"
 *     "404":
 *      description: Napaka zahteve, zahtevanega artikla ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemPonudnika"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *     "500":
 *      description: Napaka pri brisanju artikla.
 */
 router.delete('/osnovno/:idPonudnika/deleteArtikel/:idArtikla', ctrlOsnovno.izbrisiArtikel);

/**
 * @swagger
 *  /osnovno/{idPonudnika}/posodobiArtikel/{idArtikla}:
 *   put:
 *    summary: Posodabljanje artikla na meniju
 *    description: Posodobitev **podrobnosti artikla** na meniju ponudnika.
 *    tags: [Osnovno]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPonudnika
 *       description: enolični identifikator ponudnika
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idArtikla
 *       description: enolični identifikator artikla
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Uspešno posodobljen artikel, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/MenuPrikazi"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve pri posodabljanju artikla.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemPonudnika"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */
 router.put('/osnovno/:idPonudnika/posodobiArtikel/:idArtikla', ctrlOsnovno.urediArtikel);

/**
 * @swagger
 *  /osnovno/{idPonudnika}/dodajArtikel:
 *   post:
 *    summary: Dodajanje novega artikla
 *    description: Dodajanje **novega artikla** na menu.
 *    tags: [Osnovno]
 *    security:
 *     - jwt: []
 *    responses:
 *     "201":
 *      description: Uspešno dodan artikel, ki se doda na menu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/MenuPrikazi"
 *     "400":
 *      description: Napaka pri shranjevanju artikla.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 */
 router.post('/osnovno/:idPonudnika/dodajArtikel', ctrlOsnovno.kreirajArtikel);


 router.get('/osnovno/ponudnikPrikazi', ctrlOsnovno.ponudnikPrikazi); //ne uporabljamo


 router.get('/narocilo/potrjen', ctrlNarocilo.statusNarocila); //ni api
 router.get('/narocilo/obdelava', ctrlNarocilo.nalaganje); //ni api


/**
 * @swagger
 *  narocilo/placilo/{idPlacila}/:
 *   get:
 *    summary: Prikaz obrazca za vnos podatkov o plačilo glede na **id plačila**.
 *    description:
 *    tags: [Narocilo]
 *    parameters:
 *     - in: query
 *       name: idPlacila
 *       description:
 *       schema:
 *        type: string
 *       required: true
 *       example: 5fdfa1d3bbfda64a4442p7f5
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s košarico in obrazcem v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/PlaciloNarocilo"
 *     "404":
 *      description: Napaka zahteve, zahtevanega plačila ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem plačila:
 *          $ref: "#/components/examples/NeNajdemPlacila"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
 router.get('/narocilo/placilo/:idPlacila', ctrlNarocilo.placilo);


/**
 * @swagger
 *  /{idPlacila}/kosarica/{idArtiklaKosarica}:
 *   put:
 *    summary: Posodabljanje količine artikla v košarici
 *    description: Posodobitev **količine** artikla v košarici.
 *    tags: [Narocilo]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPlacila
 *       description: enolični identifikator plačila
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idArtiklaKosarice
 *       description: enolični identifikator artikla
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Uspešno posodobljena količina artikla v košarici.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/UspesnoKolicina"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiNobenegaArtikla"
 *     "404":
 *      description: Napaka zahteve pri posodabljanju količine.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemArtikla"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */
 router.put('/:idPlacila/kosarica/:idArtiklaKosarica', ctrlOsnovno.spremeniKolicinoKosarica);

/**
 * @swagger
 *  /{idPlacila}/kosaricaIzbrisi/{idArtiklaKosarica}:
 *   delete:
 *    summary: Brisanje artikla iz košarice
 *    description: Brisanje **izbranega artikla** iz košarice.
 *    tags: [Narocilo]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPlacila
 *       description: enolični identifikator plačila
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idArtiklaKosarica
 *       description: enolični identifikator artikla
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan artikel iz košarice.
 *      content:
 *       application/json:
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/UporabnikIzbrisan"
 *     "404":
 *      description: Napaka zahteve, zahtevanega artikla ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemArtikla"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *     "500":
 *      description: Napaka pri brisanju artikla.
 */
 router.delete('/:idPlacila/kosaricaIzbrisi/:idArtiklaKosarica', ctrlOsnovno.izbrisiKosarica);

/**
 * @swagger
 *  /{idPlacila}/kosarica:
 *   get:
 *    summary: Prikaz košarice glede na **id plačila**.
 *    description:
 *    tags: [Narocilo]
 *    parameters:
 *     - in: query
 *       name: idPlacila
 *       description:
 *       schema:
 *        type: string
 *       required: true
 *       example: 5fdfa1d3bbfda64a4442p7f5
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s košarico v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/PrikaziKosarica"
 *     "404":
 *      description: Napaka zahteve, zahtevane košarice ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem plačila:
 *          $ref: "#/components/examples/NeNajdemPlacila"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
 router.get('/:idPlacila/kosarica', ctrlOsnovno.prikaziKosarica);
 //router.post('/:idPlacila/kosaricaDodaj', ctrlOsnovno.dodajKosarica);

//osnovno
/**
 * @swagger
 *   /regclana:
 *     post:
 *       summary: Registracija novega člana
 *       description: Registracija **novega člana** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       responses:
 *         "200":
 *           description: Uspešna registracija.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             examples:
 *               vsi podatki:
 *                 $ref: "#/components/examples/VsiPodatki"
 *               elektronski naslov ni ustrezen:
 *                 $ref: "#/components/examples/EmailNiUstrezen"
 *         "409":
 *           description: Napaka zahteve, član že obstaja.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Član s tem elektronskim naslovom je že registriran.
 *
 *         "500":
 *           description: Napaka na strežniku pri registraciji člana.
 */
 router.post('/registracijaClana', ctrlOsnovno.kreirajUporabnika);

/**
 * @swagger
 *  /izbrisUporabnika/{idUporabnika}:
 *   delete:
 *    summary: Brisanje uporabnika
 *    description: Brisanje **izbranega uporabnika**.
 *    tags: [Avtentikacija]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUporabnika
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan uporabnik.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/UporabnikIzbrisan"
 *     "404":
 *      description: Napaka zahteve, zahtevanega uporabnika ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *     "500":
 *      description: Napaka pri brisanju uporabnika.
 */
 router.delete('/izbrisUporabnika/:idUporabnika', ctrlOsnovno.brisiUporabnika);

/**
 * @swagger
 *   /regponudnika:
 *     post:
 *       summary: Registracija novega ponudnika
 *       description: Registracija **novega ponudnika** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       responses:
 *         "200":
 *           description: Uspešna registracija.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             examples:
 *               vsi podatki:
 *                 $ref: "#/components/examples/VsiPodatki"
 *               elektronski naslov ni ustrezen:
 *                 $ref: "#/components/examples/EmailNiUstrezen"
 *         "409":
 *           description: Napaka zahteve, ponudnik že obstaja.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Ponudnik s tem elektronskim naslovom je že registriran.
 *
 *         "500":
 *           description: Napaka na strežniku pri registraciji ponudnika.
 */
 router.post('/registracijaPonudnika', ctrlOsnovno.kreirajPonudnika);

/**
 * @swagger
 *  /izbrisPonudnika/{idPonudnika}:
 *   delete:
 *    summary: Brisanje ponudnika
 *    description: Brisanje **izbranega ponudnika**.
 *    tags: [Avtentikacija]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPonudnika
 *       description: enolični identifikator ponudnika
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan ponudnik.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/PonudnikIzbrisan"
 *     "404":
 *      description: Napaka zahteve, zahtevanega ponudnika ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem ponudnika:
 *          $ref: "#/components/examples/NeNajdemPonudnika"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *     "500":
 *      description: Napaka pri brisanju ponudnika.
 */
 router.delete('/izbrisPonudnika/:idPonudnika', ctrlOsnovno.brisiPonudnika);

 router.route("/baza")
     .post(ctrlBaza.dodajZacetnoVsebino)
     .delete(ctrlBaza.izbrisiVsebino);

router.get('/podatkiGraf', ctrlOsnovno.podatkiGraf);
router.get('/prvoPlacilo', ctrlOsnovno.prvoPlacilo);

/*
router.get('/', ctrlOsnovno.osnZaslon);
router.get('/prijava', ctrlOsnovno.prijava);
router.get('/registracijaClana', ctrlOsnovno.registracija1);
router.get('/registracijaPonudnika', ctrlOsnovno.registracija2);
router.get('/kosarica', ctrlOsnovno.kosarica);
router.get('/upravljanjeBaze', ctrlOsnovno.upravljanjeBaze);
*/




module.exports = router;
