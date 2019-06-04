const mysql = require('mysql');   // npm install mysql

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123mysql"
// });

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

*/

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123mysql",
  port: '3366',
  database: 'rominaweb'
});


  con.connect(function(err) {
    if (err)  console.log("ERROR deconexion:", err);
    console.log("Connected!");
  });


module.exports = con;
