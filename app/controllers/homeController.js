const dbConnection = require('../../config/dbConnection');
const { getPaintings, addpainting, getPaintingModel, updatePainting} = require('../models/homeModels');

module.exports.home = (app, req, res) => {
  // Aqui vamos fazer a chamada para o model do banco de dados.
  console.log('[Controller home]');
  
  // Correção: Mudou 'dbConn' para 'dbConnection' para consistência e evitar erro de variável
  const conn = dbConnection();  // Chama a função corretamente e armazena em 'conn'

  getPaintings(conn, (error, result) => {
   // console.log(error);
   // console.log(result);

    if (error) {
      console.error('Erro ao buscar pinturas:', error);
      return res.status(500).render('home.ejs', { paintings: [], error: 'Erro no banco de dados' });
    }

    res.render('home.ejs', { paintings: result });
  })
} 

module.exports.addPainting = async (app, req, res) => {
  console.log('[Controller addPainting]');
  console.log(req.body)
  const conn = dbConnection();
  addpainting(conn, req.body, (error, result) => {
      console.log('Error: ', error);
      if(error){
        res.send('Erro ao gravar no banco de dados');
        return error;
      }
      console.log('Resultado', result);
      res.redirect('/');
  });
    
  
  //receber os dados, validar e salvar no banco e retornar uma resposta
}

module.exports.getPaintingController = async(app, req, res) =>{
  console.log("[Controller getPainting]");
  const idObra = req.query.idobra;
  console.log("idObra = ",idObra);
  const conn = dbConnection();

  getPaintingModel(idObra, conn, (erro, result) =>{
    res.render('showPainting.ejs', {painting: result})
  });

}

module.exports.editPainting = (app, req, res) =>{
  console.log('[Controller editPainting]');
  const id = req.query.idobra;
  const conn = dbConnection();
  getPaintingModel(id, conn, (error, result) =>{
    if(error || !result[0]){
      console.error(`Erro ao busca pintura: ${error}`);
      return res.status(404).render('notfound.ejs');
    }
    res.render('edit.ejs', {painting: result[0], errors: []});
  });
};

module.exports.updatePainting = (app, req, res) =>{
  console.log('[Controller updatePainting]');
  console.log(req.body);

  const id = req.query.idobra;
  const conn = dbConnection();

  this.updatePainting(conn, id, req.body, (error, result) => {
    if (error) {
      console.error(`Erro ao atualizar pintura: ${error}`);
      return res.status(500).send('Erro ao atualizar no banco de dados');
    }
    if(result.affectedRows === 0){
      return res.status(404).render('notfound.ejs');
    }
    req.session.success = 'Obra atualizada com sucesso!';
    res.redirect('/');
  });
};