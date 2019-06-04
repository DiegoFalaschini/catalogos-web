var express = require('express');           // npm install express --save
var mysql = require('mysql');   // npm install mysql

// upload imagenes
var fileUpload = require('express-fileupload'); // npm install --save express-fileupload

// Get imagenes
const path = require('path');
const fs = require('fs');

var con = require('../connectors/mysql-conect');

var Articulo = require('../models/articulo');

var app = express();




// ===============================================
// Obtener todos los usuarios
// ===============================================
app.get('/', (req, res, next) => {
    
    console.log('Todos params: ', req.params);
     
    
    con.query('SELECT * from articulos', function (error, results, fields) {
        
        if (error) {
            
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        

        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                articulos: results,
                //columnas: fields
            })
        }

    });

})




// ===============================================
// Obtener un articulo
// ===============================================
app.get('/:id', (req, res, next) => {
    
    console.log('Uno params: ', req.params);
     
    
    con.query('SELECT * from articulos where idarticulo = ' + req.params.id, function (error, results, fields) {
        
        if (error) {
            
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        

        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                articulos: results,
                //columnas: fields
            })
        }

    });

})
// default options
app.use(fileUpload());

app.post('/', (req, res, next) => {

    var articulo = new Articulo();
    
    nombre = req.body.nombre;
    descripcion = req.body.descripcion;
    precio = req.body.precio;
    stock = req.body.stock;
    colores = req.body.colores;
    talles = req.body.talles;

    console.log('Archivos:', req);
    


    if (req.files) {

        var archivo =  req.files.imagen;

        var nombreCortado = archivo.name.split('.');
        var extensiónArchivo = nombreCortado[ nombreCortado.length -1];


        var nombreArchivo = nombreCortado[0] + '-' + Date.now() + '.' + extensiónArchivo;
        var imagenPath = './uploads/articulos/' + nombreArchivo;
        console.log('Imagen:', imagenPath);


        archivo.mv( imagenPath, err => {

            if (err) {
                return res.status(500).json( {
                    ok: false,
                    mensaje: 'Error al mover el archivo',
                    errors: err
                })        
            }

        });        
        
    }


    var sql = "INSERT INTO rominaweb.articulos ( nombre, descripcion, precio, stock, colores, talles, imagen) VALUES (?)";
    var values = [ [nombre, descripcion, precio, stock, colores, talles, nombreArchivo] ];


        console.log(sql);
       
        con.query(sql, values, function (err, result) {
            if (err) {
            
                console.log(err);
                
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                })
            
                //throw err;
            } else {
    
                return res.status(200).json({
                    ok: true,
                    mensaje: "todo ok",
                    articulo: result,
                    //columnas: fields
                })
            }
        });

      
});


function setImageArticulo( id, filename ) {

    sql =  `Update Articulos 
            Set imagen = ${filename}
            Where id=${ id }`;

    con.query(sql, function (err, result) {
        if (!err) {

            return true;
        } else {
            return false;
        }
    })

}


module.exports = app;