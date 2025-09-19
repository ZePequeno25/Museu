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