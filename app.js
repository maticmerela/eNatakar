var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "eNatakar",
            version: "1.0.0",
            description: "eNatakar REST API"
        },
        license: {
            name: "GNU LGPLv3",
            url: "https://choosealicense.com/licenses/lgpl-3.0"
        },
        contact: {
            name: "LP-29",
            url: "https://www.neki.com",
            email: "enatakar@gmail.com"
        },
        servers: [
            {url: "http://localhost:3000/api"},
            {url: "https://enatakar.herokuapp.com/api"}
        ]
    },
    apis: [
        "./app_api/models/narocilo.js",
        "./app_api/models/osnovno.js",
        "./app_api/routes/index.js"
    ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);


require('./app_api/models/db');

//var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
var indexApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', indexApi);
app.get('/  (\/nalaganje)|(\/prijava)|(\/regclana)|(\/regponudnika)|(\/sprejeto)|(\/narocila)|(\/db)|(\/placilo\/[a-z0-9]{24})|(\/[a-z0-9]{24}\/kosarica)|(\/[a-z0-9]{24}\/vnoshrane)|(\/osnovno\/[a-z0-9]{24}\/menu)|(\/osnovno\/[a-z0-9]{24}\/menuPonudnik)/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});
indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//Helper
require('./app_server/views/helpers/hbsh.js');

module.exports = app;
