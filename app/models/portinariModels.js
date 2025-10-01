module.exports = {
  getPaintings: (conn, callback) => {
    const sql = 'select * from obrasdearte where artista="Cândido Portinari";';
    conn.query(sql, callback);
  }
}