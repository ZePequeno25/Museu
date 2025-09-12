const dbConnection = require('../../config/dbConnection.js');
const { insertComment } = require('../models/mensagem.js');

module.exports.comentarioPost = (app, req, res) => {
  console.log('[Controller ComentarioPost]');
  const { comentary, id_obradearte } = req.body;
  const dbConn = dbConnection();

  // Validação básica (opcional, mas bom para evitar erros no BD)
  if (!comentary || !id_obradearte) {
    console.error('Validação falhou: campos obrigatórios faltando');
    return res.redirect('/?success=false&erro=Comentário e ID da obra são obrigatórios!');
  }

  insertComment(dbConn, comentary, parseInt(id_obradearte), (error, result) => {
    console.log('Erro: ', error);
    console.log('Resultado inserido:', result);

    if (error) {
      console.error('Erro ao inserir comentário:', error);
      return res.redirect('/?success=false&erro=Erro ao salvar no banco!');
    } else {
      console.log('Comentário inserido com sucesso!');
      res.redirect('/?success=true'); // OK: Redireciona para home com sucesso
    }
  });
};