const hbs = require('hbs');

hbs.registerHelper('prazenNiz', (niz) => {
    let prazenNiz = niz;
    if(prazenNiz == '') {
        prazenNiz = '/';
    } 
    return prazenNiz;
});

hbs.registerHelper('zvezdice', (ocena) => {
    let zvezdice = '';
    for (let i = 1; i <= 5; i++)
        zvezdice += '<i class="fa' + (ocena >= i ? 's' : 'r') + ' fa-star"></i>';
    return zvezdice;
});

hbs.registerHelper('alergeni', (alergeni) => {
    let alergeniVsi = ['gluten',
        'raki/ribe/mehkužci',
        'jajca',
        'arašidi',
        'laktoza',
        'soja',
        'oreščki',
        'listnata zelena',
        'gorčično seme',
        'sezamovo seme',
        'žveplov dioksid in sulfiti',
        'volčji bob',
        'jed ne vsebuje alergenov'];
    let nekAlergen = '';
    for (let i = 0; i <= alergeniVsi.length; i++)
        if(alergeni[i] === true && i != alergeniVsi.length-1)
            nekAlergen += alergeniVsi[i]+',';
        //      alergeni[i] = alergeniVsi[i];
        else if(alergeni[i] === true && i == alergeniVsi.length-1)
            nekAlergen += alergeniVsi[i];

    return nekAlergen;
});

hbs.registerHelper('replace', function( find, replace, options) {
    var string = options.fn(this);
    return string.replace( find, replace );
});