// Iniciar proyecto en Nodejs = npm init
// Iniciar Nodemon (escucha los cambios y reinicia el servidor automaticamente) = npm install --save-dev nodemon

// Requires
var express = require('express');           // npm install express --save
//var mongoose = require('mongoose');         // npm install mongoose
var bodyParser =  require('body-parser');   // npm install body-parser

var articulosRoutes = require('./routes/articulos');
var catalogosRoutes = require('./routes/catalogo');
var imagenesRoutes = require('./routes/imagenes');



var app = express();

// CORS // https://enable-cors.org/server_expressjs.html

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Last-Modified");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    next();
  });
  


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/articulos', articulosRoutes);
app.use('/catalogos',catalogosRoutes);
app.use('/img', imagenesRoutes);
app.use('/', articulosRoutes);

app.listen (3333, () => {
    console.log('express port \x1b[32m%s\x1b[0m', '3000');
});









