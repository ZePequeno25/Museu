const { console } = require('inspector');
const dbConnection = require('../../config/dbConnection');
const { getPaintings, getPainting, updatePainting, addpainting } = require('../models/homeModels');

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
  });
};

module.exports.getPaintingController = (app, req, res) => {
  console.log('[Controller Home Get Painting]');
  let paintingId = req.query.idobra;
  console.log(paintingId);
  dbConn = dbConnection();
  getPainting(paintingId, dbConn, (error, result) => {
    res.render('showPainting.ejs', { painting: result });
  });
};

module.exports.editPainting = (app, req, res) => {
  console.log('[Controller editPainting]');
  const id = req.params.id;
  const conn = dbConnection();
  getPainting(id, conn, (error, result) => {
    if(error || !result[0]){
      console.error('Erro ao buscar pintura:', error);
      return res.status(404).render('notfound.ejs');
    }
    res.render('edit.ejs', { painting: result[0], errors: [] });
  });
};

module.exports.updatePainting = (app, req, res) => {
  console.log('Controller updatePainting');
  console.log(req.body);

  const id = req.params.id;
  const conn = dbConnection();
  updatePainting(conn, id, req.body, (error, result) =>{
    if(error){
      console.error('Erro ao atualizar pintura:', error);
      return res.status(500).send('Erro ao atualizar no banco de dados');
    }
    if(result.affectedRows === 0){
      return res.status(404).render('notfound.ejs');
    }
    req.session.sucess = 'Obra atualizada com sucesso!';
    res.redirect('/');
  });
};