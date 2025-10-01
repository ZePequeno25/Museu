module.exports = {
  getPaintings: (conn, callback) => {
    const sql = 'select * from obrasdearte where artista="Tarsila do Amaral";';
    conn.query(sql, callback);
  }
}