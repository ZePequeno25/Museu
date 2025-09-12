const dbConnection = require('../../config/dbConnection');
const { getPaintings } = require('../models/tarsila');
module.exports.tarsila = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Tarsila]');
  dbConn = dbConnection();
  getPaintings(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('tarsila.ejs', { paintings: result });
  })
} 