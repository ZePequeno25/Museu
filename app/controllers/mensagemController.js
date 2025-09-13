const dbConnection = require('../../config/dbConnection.js');
const MensagemModel = require('../models/mensagemModel');  

// Função pro POST: processa o form e insere no BD
exports.mensagemPost = (app, req, res) => {
  console.log('[Controller ComentarioPost]');

  const comentario = req.body.comentary;
  const idObra = req.body.id_obradearte;

  if (!comentario || !idObra) {
      console.error('Dados inválidos!');
      return res.redirect('/');
  }

  const MensagemModel = require('../models/mensagemModel');
  MensagemModel.insertComentario(comentario, idObra, (err, result) => {
      if (err) {
          console.error('Erro no model:', err.message || err);
          return res.redirect('/');
      }

      console.log('Resultado inserido:', result);
      console.log('Comentário inserido com sucesso!');

      res.redirect('/sucesso?obra=' + idObra + '&id=' + result.insertId);
  });
};

exports.sucessGet = (app, req, res) => {
  console.log('[Controller Sucesso]');

  const idObra = req.query.obra || null;
  const idComentario = req.query.id || null;

  res.render('sucesso', { 
      mensagem: 'Comentário inserido com sucesso!', 
      idObra: idObra, 
      idComentario: idComentario 
  });
};