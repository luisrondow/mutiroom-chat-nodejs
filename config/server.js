//importar o modulo do framework express
var express = require('express');

// importar o modulo do consign
var consign = require('consign');

//importar o modulo do body-parser
var bodyParser = require('body-parser');

//importar o modulo do express-validator
var expressValidator = require('express-validator');

//iniciar o objeto do express
var app = express();

//setar as variaver 'view-engine' e 'view' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurar o middleware express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configurar o middleware express-validate
app.use(expressValidator());

//efetua o autoload das rotas, models e controllers para o app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);
    
//eportar o objeto app
module.exports = app;