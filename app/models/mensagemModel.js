const db = require('../../config/dbConnection.js');

console.log('DEBUG no model: db importado =', db);
if (!db) {
    console.error('ERRO: db é undefined! Verifique o require ou o export em config/database.js');
} else {
    console.log('DEBUG: db tem query?', typeof db.query);
}

module.exports = {
  insertComentario: (comentario, idObra, callback) => {
      // Check de segurança: Se db.query não existir, loga e para
      if (typeof db.query !== 'function') {
          console.error('ERRO: db.query não é uma função! Verifique a conexão no config/database.js');
          return callback(new Error('Conexão de BD inválida'), null);
      }

      const query = 'INSERT INTO mensagens (comentario, id_obra) VALUES (?, ?)';  // Ajuste tabela/colunas
      db.query(query, [comentario, idObra], (err, result) => {
          console.log('[Model Mensagem - Insert Comment]');  // Seu log existente
          if (err) {
              console.error('Erro no INSERT:', err);
          }
          callback(err, result);  // Passa pro controller
      });
  }
};