module.exports.getPaintings = (conn, callback) => {
  conn.query('SELECT * FROM obrasdearte', (err, results) => {  // Ajuste a tabela/query
    callback(err, results);
  });
};