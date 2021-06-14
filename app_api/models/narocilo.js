const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Kosarica:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *      example: Burger
 *     cena:
 *      type: number
 *      example: 10
 *     slika:
 *      type: buffer
 *      example: http://www.pngmart.com/files/5/Hamburger-PNG-Transparent-Image.png
 *     kolicina:
 *      type: number
 *      example: 2
 *    required:
 *     - naziv
 *     - cena
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   PrikaziKosarica:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 5fdfa1d3bbfda64a4442p7f5
 *     kosarica:
 *      type: object
 *      $ref: "#/components/schemas/Kosarica"
 *    required:
 *     - _id:
 */

const kosaricaShema = new mongoose.Schema ({
    naziv: {type: String, required: true},
    cena: {type: Number, required: true},
    slika: {data: Buffer,contentType: String},
    kolicina: {type: Number}
});

/**
 * @swagger
 * components:
 *  schemas:
 *   PlaciloNarocilo:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 5fdfa1d3bbfda64a4442p7f5
 *     kosarica:
 *      type: object
 *      $ref: "#/components/schemas/Kosarica"
 *     stMize:
 *      type: number
 *      example: 1
 *     opombe:
 *      type: string
 *      example: Brez cebule.
 *     stanje:
 *      type: boolean
 *      example: false
 *    required:
 *     - stMize
 *
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
 *    UspesnoKolicina:
 *     summary: količina je bila uspešno posodobljena
 *     value:
 *      sporočilo: Količina je bila uspešno posodobljena!
 */

//ista shema za ponudnika in uporabnika, ob sprejetem naročilu se default "false" spremeni na "true" s strani ponudnika
const placiloShema = new mongoose.Schema ({
    kosarica: [kosaricaShema],
    stMize: {type: Number, required: true},
    opombe: {type: String, "default": ""},
    stanje: {type: Boolean, "default": false}
});

/**
 * @swagger
 * components:
 *  examples:
 *    NiZetona:
 *     summary: ni žetona
 *     value:
 *      sporočilo: Ni žetona!
 */



mongoose.model('Placilo', placiloShema, 'Placila');