// ===============================================
// Obtener todos los catalogosxarticulos
// ===============================================
app.get('/:id', (req, res, next) => {

    console.log('GET catalogosxarticulos: ', req.params);

    // SELECT * FROM catalogoxarticulo c Inner Join articulos a On idarticulos = idarticulo ;

    con.query('SELECT * from catalogosxarticulos ', function (error, results, fields) {


        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: error
            })
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'todo ok',
                catalogosxarticulos: results,
            })
        }
    });
});