<<<<<<< HEAD
module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from obrasdearte where artista="Cândido Portinari";';
    connection.query(sql, callback);
  }
=======
module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from obrasdearte where artista="Cândido Portinari";';
    connection.query(sql, callback);
  }
>>>>>>> 139b3c0 (pit)
}