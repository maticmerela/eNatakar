

function prenesiRacun(){


    var data = {
        "currency": "EUR",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.pngitem.com/pimgs/m/6-69917_silverware-free-stock-photo-utensils-clipart-black-and.png", //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "eNatakar™",
            "address": "Tržaška cesta 22",
            "zip": "1000",
            "city": "Ljubjana",
            "country": "Slovenija"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "client": {
            "company": "Žan Novak",
            "address": "",
            "zip": "",
            "city": "",
            "country": ""
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "invoiceNumber": "11",
        "invoiceDate": "30.11.2020",
        "products": [
            {
                "quantity": "2",
                "description": "Burger",
                "tax": 9.5,
                "price": 7
            },
            {
                "quantity": "1",
                "description": "Pizza",
                "tax": 9.5,
                "price": 7
            }
        ],
        "bottomNotice": "Hvala za na naročilo uporabili eNatakar™."
    }

//Create your invoice! Easy!
    easyinvoice.createInvoice(data, function (result) {
        //The response will contain a base64 encoded PDF file
        console.log(result.pdf);
        easyinvoice.download("racun.pdf");
    });
}




