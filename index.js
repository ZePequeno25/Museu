const express = require("express");
const routes = require("./app/routes/routes.js");
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static("./public"))
app.set('views', './app/views');

routes.home(app);
routes.tarsila(app);
routes.portinari(app);
routes.routeNotFound(app);

app.use((req, res, next) => {
        
    res.status(404).render('erro.ejs', { url: req.originalUrl });
});

app.listen(port, function(){
    console.log("Servidor rodando na porta:",port);
})