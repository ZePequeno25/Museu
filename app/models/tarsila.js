module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from obrasdearte where artista="Tarsila do Amaral";';
    connection.query(sql, callback);
  }
}