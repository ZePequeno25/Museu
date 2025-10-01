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