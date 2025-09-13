const dbConnection = require("../../config/dbConnection.js");
const { salvar } = require("../models/mensagemModel.js");

module.exports = (app, req, res) => {
  console.log("[Controller Mensagem]");

  const conn = dbConnection();
  const { comentary, id_obradearte } = req.body;

  if (!comentary || !id_obradearte) {
    return res.status(400).send("Dados inválidos");
  }

  salvar(conn, comentary, id_obradearte, (err, result) => {
    if (err) {
      console.error("Erro ao salvar comentário:", err);
      return res.status(500).send("Erro no servidor");
    }
    console.log("Comentário salvo:", result);
    res.redirect("/"); 
  });
};
