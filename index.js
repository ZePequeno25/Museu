const express = require("express");
const app = express();
const routes = require("./app/routes/routes");

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


routes.home(app);
routes.tarsila(app);
routes.portinari(app);
routes.enviaMensagem(app);
routes.getPainting(app);
routes.editPainting(app);
routes.updatePainting(app);
routes.InsertPainting(app);
routes.savePainting(app);

//ultimo sempre
routes.routeNotFound(app);
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})