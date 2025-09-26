module.exports.getPaintings = (conn, callback) => {
  conn.query('SELECT * FROM obrasdearte', (err, results) => {  // Ajuste a tabela/query
    callback(err, results);
  });
};

module.exports.addpainting = (conn, painting, callback) =>{
  const sql = 'INSERT INTO obrasdearte (nome, artista, ano, urlimagem) VALUES(?,?,?,?);';
  console.log('Home model addpainting');
  conn.query(sql, [painting.nome, painting.artista, painting.ano,painting.urlimagem], callback);
}

module.exports.getPaintingModel = (idObra, conn, callback) =>{
  const sql = `SELECT * FROM obrasdearte where id = ${idObra};`;
  console.log('Home model getPaintingModel');

  conn.query(sql, callback);
}

module.exports.updatePainting = (conn, id, painting, callback) =>{
  const sql = 'UPDATE obrasdearte SET nome = ?, artista = ?, ano = ? WHERE id = ?';
  console.log('Home model updatePainting');
  conn.query(sql, [painting.nome, painting.artista, painting.ano, id], callback);

};
