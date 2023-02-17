const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
var connection;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function dbconn(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 's54_db'
    })
    
    connection.connect()
    
  }
  
  app.get('/tipus', (req, res) => {

    dbconn()
    
    connection.query('SELECT * from auto_marka INNER JOIN auto_tipus ON auto_marka.marka_id=auto_tipus.marka_id', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()

  })
  app.get('/marka', (req, res) => {

    dbconn()

  connection.query('SELECT * from auto_marka', function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()

})

app.get('/alkatresz', (req, res) => {

  dbconn()
  
  connection.query('SELECT * from auto_alkatresz_kateg INNER JOIN auto_marka ON auto_alkatresz_kateg.komp_marka=auto_marka.marka_id INNER JOIN auto_tipus on auto_alkatresz_kateg.komp_tipus=auto_tipus.autotipus_id;  ', function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()

})

app.post('/keres', (req, res) => {

  dbconn()

   let parancs='SELECT * from auto_tipus where típus like "%'+req.body.bevitel1+'%"'
   connection.query(parancs, function (err, rows, fields) {
     if (err) throw err
   
     console.log(rows)
     res.send(rows)
   })
   
   connection.end()

 })

 app.post('/alkatreszkereses', (req, res) => {

  dbconn()

   let parancs='SELECT * from auto_alkatresz_kateg where alkatresz_nev like "%'+req.body.bevitel1+'%"'
   connection.query(parancs, function (err, rows, fields) {
     if (err) throw err
   
     console.log(rows)
     res.send(rows)
   })
   
   connection.end()

 })

app.post('/erdekel',(req,res)=>{
   dbconn()
   
   let parancs='INSERT INTO erdekel VALUES (NULL, '+req.body.bevitel1+' , "'+req.body.bevitel2+'", NOW())'
   connection.query(parancs, function (err, rows, fields) {
     if (err) 
         console.log(err)
   else
     res.send("Sikerült a vásárlás rögzítése!")
   })
   
   connection.end()

 
})


app.post('/feltoltes', (req, res) => {

  dbconn()

   let parancs='INSERT INTO auto_alkatresz_kateg VALUES (NULL, '+req.body.komptipus+', '+req.body.kompmarka+' ,"'+req.body.alkatreszgyarto+'", "'+req.body.alkatresznev+'","'+req.body.alkatreszcikkszam+'", '+req.body.alkatreszar+',"")'
   connection.query(parancs, function (err, rows, fields) {
     if (err) 
         console.log(err)
   else
     res.send("Sikerült a felvitel!")
   })
   
   connection.end()

 })

 app.delete('/torlesalkatresz', (req, res) => {

  dbconn()

   let parancs="delete from auto_alkatresz_kateg where alkatresz_id="+req.body.bevitel1
   connection.query(parancs, function (err, rows, fields) {
     if (err) 
         console.log(err)
   else
     res.send("Sikeres törlés!")
   })
   
   connection.end()

 })

 app.delete('/torlestipus', (req, res) => {

  dbconn()

   let parancs="delete from auto_tipus where autotipus_id="+req.body.bevitel1
   connection.query(parancs, function (err, rows, fields) {
     if (err) 
         console.log(err)
   else
     res.send("Sikeres törlés!")
   })
   
   connection.end()

 })

 app.post('/feltoltes', (req, res) => {

  dbconn()

   let parancs='INSERT INTO auto_alkatresz_kateg VALUES (NULL, '+req.body.komptipus+', '+req.body.kompmarka+' ,"'+req.body.alkatreszgyarto+'", "'+req.body.alkatresznev+'","'+req.body.alkatreszcikkszam+'", '+req.body.alkatreszar+',"")'
   connection.query(parancs, function (err, rows, fields) {
     if (err) 
         console.log(err)
   else
     res.send("Sikerült a felvitel!")
   })
   
   connection.end()

 })

};
