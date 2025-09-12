const { home } = require('../controllers/home.js');
<<<<<<< HEAD 
=======
const { comentarioPost } = require('../controllers/mensagem.js');
>>>>>>> 139b3c0 (pit)
const { tarsila } = require('../controllers/tarsila.js');
const { portinari } = require('../controllers/portinari.js');

module.exports = {
  home: (app) => {
    console.log('Rota / criada');
    app.get('/', function (req, res) {
      console.log('Rota / acionada');
      home(app, req, res); //Controller da home
    });
  },
  tarsila: (app) => {
    app.get('/tarsila', function (req, res) {
      console.log('Rota /tarsila acionada');
      tarsila(app, req, res);
    });
  },
  routeNotFound: (app) => {
    app.get('.', function(req, res) {
      console.log('Rota não encontrada');
      res.render('notfound.ejs');
    })
  },  portinari: (app) => {
    app.get('/portinari', function (req, res) {
      console.log('Rota /portinari acionada');
      portinari(app, req, res);
    });
<<<<<<< HEAD
=======
  },
  mensagem: (app) => {
    
    app.post('/', function (req, res) {
      console.log('Rota / acionada via POST');
      comentarioPost(app, req, res); //Controller da mensagem
    });
>>>>>>> 139b3c0 (pit)
  }

}
