const express = require("express");
const path = require('path');
const db = require('./config/dbConnection.js');  
const bodyParser = require('body-parser');
const routes = require("./app/routes/routes.js");

const app = express();
const port = 3000;

app.set('db', db);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static("./public"))
app.set('views', './app/views');

routes.home(app);
routes.tarsila(app);
routes.portinari(app);
routes.routeNotFound(app);
routes.mensagemPost(app);
routes.sucessGet(app);


app.listen(port, function(){
    console.log("Servidor rodando na porta:",port);
})