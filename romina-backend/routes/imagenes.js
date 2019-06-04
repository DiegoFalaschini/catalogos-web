var express = require('express');

var app = express();

const path = require('path');
const fs = require('fs');

// rutas
app.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;


    var pathImagen = path.resolve( __dirname, `../uploads/${ tipo }/${ img }`);

    if (fs.existsSync( pathImagen) ) {

        res.sendFile( pathImagen );
    }else {
        var pathNoImagen = path.resolve( __dirname, '../assets/no-image.jpg');
        res.sendFile( pathNoImagen);
    }


});


app.post('/:id', (req, res, next) => {


    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok:false,
            mensaje: "No seleccionó el archivo",
            errors: {message : 'Debe seleccionar una imagen'}
        })
    }


    if ( !isValidExtension(req.files.imagen) ) {
        return res.status(400).json( {
            ok: false,
            mensaje: 'Extensión del archivo no válida',
            errors: {message: 'Extensión del archivo no válida'}
        })
    } 


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
    
})




function isValidExtension(file) {

    var nombreCortado = file.name.split('.');
    var extensiónArchivo = nombreCortado[ nombreCortado.length -1];

    // Solo se aceptan estas extensiones
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];   
    
    if (extensionesValidas.indexOf(extensiónArchivo) < 0 ) {

        return false
    } else {
        return true
    }
}



module.exports = app;