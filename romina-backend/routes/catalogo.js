var express = require('express');           // npm install express --save
var con = require('../connectors/mysql-conect');
var app = express();
var Catalogo = require('../models/catalogo');
// ===============================================
// Obtener todos los catalogos
// ===============================================
app.get('/', (req, res, next) => {
    
    var catalogo = new Catalogo();
    console.log('GET Catalogos: ', req.params, catalogo.allColumns());
     
    // var sql = 'SELECT ' + catalogo.allColumns('c') + ', count(a.idarticulos) ';
    // sql += 'FROM rominaweb.catalogos c Left Join catalogoxarticulo a On (c.idCatalogos = a.idCatalogos) group by a.idcatalogos'


    var sql = `SELECT ${catalogo.allColumns('c')}, (select count(a.idarticulos) from catalogoxarticulo a where a.idCatalogos = c.idcatalogos) as cantidadArticulos FROM catalogos c`; 

    con.query(sql, function (error, results, fields) {
        
        if (error) {
            
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        

        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                catalogos: results,
                //columnas: fields
            })
        }

    });

});


// ===============================================
// Obtener articulos de un catalogo
// ===============================================
app.get('/:id/articulos', (req, res, next) => {
    console.log('GET articulos ID: ', req.params);

    var sql = `SELECT * `;
    sql += `from catalogoxarticulo c Inner Join articulos a `;
    sql += `On (c.idarticulos = a.idarticulo)`;
    sql += `where idcatalogos = ${req.params.id}`;

    con.query(sql, function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'todo ok',
                articulos: results,
            })
        }
    });
})


// ===============================================
// Agregar un Articulo a un catalogo (catalogosxarticulos)
// ===============================================
app.post('/:id/add', (req, res, next) => {

    console.log('*** Agregar un Articulo a un catalogo ***');

    var idcatalogo = req.params.id;
    var idarticulo = req.body.articulo;

    var sql = "Insert into catalogoxarticulo values (?)";
    var values = [ [idcatalogo, idarticulo] ];

    con.query(sql, values, function (error, results, fields) {

        if (error) {

            console.log("ERROR: ", error.sqlMessage);
            
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'todo ok',
                catalogosxarticulos: results
            })
        }
    });
})


// ===============================================
// Obtener un catalogo
// ===============================================
app.get('/:id', (req, res, next) => {
    
    console.log('GET Catalogo ID: ', req.params);
     
    
    con.query('SELECT * from catalogos where idcatalogos = ' + req.params.id, function (error, results, fields) {
        
        if (error) {
            
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        

        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                catalogo: results,
            })
        }

    });

});


// ===============================================
// Nuevo catalogos
// ===============================================
app.post('/', (req, res, next) => {

    console.log('NEW catalogos: ', req.params);
    
    descripcion = req.body.descripcion;

    var sql = "INSERT INTO catalogos ( descripcion) VALUES (?)";
    var values = [ [descripcion] ];
    
    con.query(sql, values, function (err, result) {
        if (err) {
        
            return res.status(400).json({
                ok: false,
                mensaje: err
            })
        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                catalogo: result,
            })
        }
    });

});



// ===============================================
// Actualiza catalogos
// ===============================================
app.put('/:id', (req, res, next) => {

    console.log('UPDATE catalogos: ', req.params);
    
    var id = req.params.id
    var descripcion = req.body.descripcion;

    var sql =  `UPDATE catalogos SET descripcion = '${descripcion}' WHERE idcatalogos= ${id}`;
    
    con.query(sql, function (err, result) {
        if (err) {
        
            return res.status(400).json({
                ok: false,
                mensaje: err
            })
        } else {

            return res.status(200).json({
                ok: true,
                mensaje: "todo ok",
                catalogo: result,
            })
        }
    });

});


module.exports = app;