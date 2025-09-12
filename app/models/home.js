module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from obrasdearte;';
    connection.query(sql, callback);
  }
}