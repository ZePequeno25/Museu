const dbConnection = require('../../config/dbConnection');
const { getPaintings } = require('../models/Modelshome');
module.exports.home = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller home]');
  dbConn = dbConnection();
  getPaintings(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    res.render('home.ejs', { paintings: result });
  })
} 