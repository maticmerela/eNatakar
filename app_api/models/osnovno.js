const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   RegistracijaUporabnika:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *      example: Mare
 *     priimek:
 *      type: string
 *      example: Care
 *     uporabniskoIme:
 *      type: string
 *      example: car3000
 *     geslo:
 *      type: string
 *      example: v4rn0G3s!o
 */

const registracijaClanaShema = new mongoose.Schema({
    ime: {type: String},
    priimek: {type: String},
    uporabniskoIme: {type: String},
    geslo: {type: String},
});
/*
const shemaNaslov = new mongoose.Schema({
    ulica: {type: String, required: true},
    hisnaSt: {type: String, required: true},
    zip: {type: Number, required: true},
    obcina: {type: String, required: true}
});
*/

/**
 * @swagger
 * components:
 *  schemas:
 *   Menu:
 *    description: Vsi produkti, ki jih ponuja ponudnik.
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *      example: Zrezek
 *     opis:
 *      type: string
 *      example: Meso, slastno meso.
 *     cena:
 *      type: number
 *      example: 10
 *     alergeni:
 *      type: array
 *      items:
 *          type: boolean
 *          example:
 *              [true, false, true, false, true, true, true, false, false, true, true, true, false]
 * 
 *     slika:
 *      type: buffer
 *      example: http://www.pngmart.com/files/5/Hamburger-PNG-Transparent-Image.png
 *    required:
 *     - naziv
 *     - cena
 *
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 *
 *
 *
 */

const menuShema = new mongoose.Schema({
    naziv: {type: String, required: true},
    opis: {type: String},
    cena: {type: Number, required: true},
    alergeni: [Boolean],
    slika: {data: Buffer,contentType: String}
});

/**
 * @swagger
 * components:
 *  schemas:
 *   RegistracijaPonudnika:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *      example: Riko
 *     priimek:
 *      type: string
 *      example: Kuhar
 *     uporabniskoIme:
 *      type: string
 *      example: gazda007
 *     geslo:
 *      type: string
 *      example: radKuham7
 *     obrat:
 *      type: string
 *      example: Satem
 *     tipKuhinje:
 *      type: string
 *      example: italijanska
 *     ulica:
 *      type: string
 *      example: Roznik
 *     hisnaSt:
 *      type: string
 *      example: 9a
 *     zip:
 *      type: number
 *      example: 1000
 *     obcina:
 *      type: string
 *      example: Ljubljana
 *     menu:
 *      type: string
 *      $ref: "#/components/schemas/MenuPrikazi"
 *    required:
 *     - ulica
 *     - hisnaSt
 *     - zip
 *     - obcina
 */
const ponudnikShema = new mongoose.Schema({
    ime: {type: String},
    priimek: {type: String},
    uporabniskoIme: {type: String},
    geslo: {type: String},
    obrat: {type: String},
    tipKuhinje: {type: String},
    ulica: {type: String, required: true},
    hisnaSt: {type: String, required: true},
    zip: {type: Number, required: true},
    obcina: {type: String, required: true},
    menu: [menuShema] //t so vsi artikli na meniju ene restavracije z imenom obrat
});

/**
 * @swagger
 * components:
 *  schemas:
 *   MenuPrikazi:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 5fdfa1d3bbfda64a4442e7f5
 *     menu:
 *      type: string
 *      $ref: "#/components/schemas/Menu"
 *    required:
 *     - _id
 *
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *
 *    UspesnoKolicina:
 *     summary: količina je bila uspešno posodobljena
 *     value:
 *      sporočilo: Količina je bila uspešno posodobljena!
 */

/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemPonudnika:
 *     summary: ne najdem ponudnika
 *     value:
 *      sporočilo: Ne najdem ponudnika.
 *    NeNajdemArtikla:
 *     summary: ne najdem artikla
 *     value:
 *      sporočilo: Ne najdem artikla.
 *    NeNajdemPlacila:
 *     summary: ne najdem plačila
 *     value:
 *      sporočilo: Ne najdem plačila.
 *    NiNobenegaArtikla:
 *     summary: ni nobenega artikla
 *     value:
 *      sporočilo: Ni nobenega artikla.
 *    NeNajdemUporabnika:
 *     summary: ne najdem uporabnika
 *     value:
 *      sporočilo: Ne najdem uporabnika.
 *
 *    PonudnikIzbrisan:
 *     summary: ponudnik je bil uspešno izbrisan
 *     value:
 *      sporočilo: Ponudnik je bil uspešno izbrisan!
 *
 *    UporabnikIzbrisan:
 *     summary: uporabnik je bil uspešno izbrisan
 *     value:
 *      sporočilo: Uporabnik je bil uspešno izbrisan!
 *

 *
 *    VsiPodatki:
 *     summary: zahtevani so vsi podatki
 *     value:
 *      sporočilo: Zahtevani so vsi podatki.
 *
 *    EmailNiUstrezen:
 *     summary: elektronski naslov ni ustrezen
 *     value:
 *      sporočilo: Elektronski naslov ni ustrezen!
 *
 */


mongoose.model('Uporabnik', registracijaClanaShema, 'Uporabniki');
mongoose.model('Ponudnik', ponudnikShema, 'Ponudniki');

