module.exports.getPaintings = (conn, callback) => {
  conn.query('SELECT * FROM obrasdearte', (err, results) => {  // Ajuste a tabela/query
    callback(err, results);
  });
};

module.exports.getPainting = (paintingId, connection, callback) => {
  const sql = `select * from obrasdearte where id='${paintingId}';`;
  console.log(sql);
  connection.query(sql, callback);
}

module.exports.updatePainting = (conn, id, painting, callback) => {
  const sql = 'UPDATE obrasdearte SET nome = ?, artista = ?, ano = ? WHERE id = ?';
  console.log('Home model updatePainting');
  conn.query(sql, [painting.nome, painting.artista, painting.ano, id], callback);
};