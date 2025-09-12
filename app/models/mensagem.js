module.exports.insertComment = (dbConn, comentary, id_obradearte, callback) => {
  console.log('[Model Mensagem - Insert Comment]');
  const query = 'INSERT INTO comments (comentary, id_obradearte) VALUES (?, ?)';
  dbConn.query(query, [comentary, id_obradearte], (error, result) => {
    callback(error, result); // Chama callback com erro ou resultado
  });
};