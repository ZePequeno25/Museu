const { home,getPaintingController } = require('../controllers/homeController.js');
const { tarsila } = require('../controllers/tarsilaController.js');
const { portinari } = require('../controllers/portinariController.js');
const mensagemController = require("../controllers/mensagemController.js");

module.exports = {
  home: (app) => {
    console.log('Rota / criada');
    app.get('/', (req, res) => {
      console.log('Rota / acionada');
      home(app, req, res); //Controller da home
    });
  },
  tarsila: (app) => {
    app.get('/tarsila', (req, res) => {
      console.log('Rota /tarsila acionada');
      tarsila(app, req, res);
    });
  },
  routeNotFound: (app) => {""
    app.get('.', (res) => {
      console.log('Rota não encontrada');
      res.status(404).render('./notfound.ejs');
    });
  },  
  portinari: (app) => {
    app.get('/portinari', (req, res) => {
      console.log('Rota /portinari acionada');
      portinari(app, req, res);
    });
  },
  enviaMensagem: (app) => {
    app.post("/enviaMensagem", (req, res) => {
      console.log("Rota /enviaMensagem acionada");
      mensagemController(app, req, res); // agora funciona
    });
  },
  getPainting: (app) => {
    app.get('/obradearte', (req,res)=>{
      console.log("Rota /obradearte acionada");
      getPaintingController(app,req,res);
    });
  }
};
