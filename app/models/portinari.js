module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from obrasdearte where artista="Cândido Portinari";';
    connection.query(sql, callback);
  }
}