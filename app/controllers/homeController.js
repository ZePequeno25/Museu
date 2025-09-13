const dbConnection = require('../../config/dbConnection');
const { getPaintings } = require('../models/homeModels');

module.exports.home = (app, req, res) => {
  // Aqui vamos fazer a chamada para o model do banco de dados.
  console.log('[Controller home]');
  
  // Correção: Mudou 'dbConn' para 'dbConnection' para consistência e evitar erro de variável
  const conn = dbConnection();  // Chama a função corretamente e armazena em 'conn'

  getPaintings(conn, (error, result) => {
    console.log(error);
    console.log(result);

    if (error) {
      console.error('Erro ao buscar pinturas:', error);
      return res.status(500).render('home.ejs', { paintings: [], error: 'Erro no banco de dados' });
    }

    res.render('home.ejs', { paintings: result });
  })
} 