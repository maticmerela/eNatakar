const {default: ow} = require('ow');
console.log("hahshshhs");

const checkPassword = ow.create(ow.string.minLength(10));
const dokument = getDocumentById("registracijaClana");
const password = dokument.getElementById(geslo);
if (checkPassword(password) === true) {
    console.log("dea!");
}
