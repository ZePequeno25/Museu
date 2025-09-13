const dbConnection = require('../../config/dbConnection.js');
const { getPaintings } = require('../models/portinariModels.js');
module.exports.portinari = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Portinari]');
  conn = dbConnection();
  getPaintings(conn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('portinari.ejs', { paintings: result });
  })
} 