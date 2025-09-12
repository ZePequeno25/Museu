<<<<<<< HEAD
const dbConnection = require('../../config/dbConnection.js');
const { getPaintings } = require('../models/portinari.js');
module.exports.portinari = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Portinari]');
  dbConn = dbConnection();
  getPaintings(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('portinari.ejs', { paintings: result });
  })
=======
const dbConnection = require('../../config/dbConnection.js');
const { getPaintings } = require('../models/portinari.js');
module.exports.portinari = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Portinari]');
  dbConn = dbConnection();
  getPaintings(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('portinari.ejs', { paintings: result });
  })
>>>>>>> 139b3c0 (pit)
} 