const dbConnection = require('../../config/dbConnection');
const { getPaintings } = require('../models/tarsilaModels');
module.exports.tarsila = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Tarsila]');
  conn = dbConnection();
  getPaintings(conn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('tarsila.ejs', { paintings: result });
  })
} 