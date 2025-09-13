module.exports = {
    salvar: (conn, comentary, id_obradearte, callback) => {
      const sql = "INSERT INTO comments (comentary, id_obradearte) VALUES (?, ?)";
      conn.query(sql, [comentary, id_obradearte], callback);
    }
  };