const Joi = require('joi')
const { home } = require('../controllers/homeController.js');
const { tarsila } = require('../controllers/tarsilaController.js');
const { portinari } = require('../controllers/portinariController.js');
const mensagemController = require("../controllers/mensagemController.js");
const { addPainting } = require('../controllers/homeController.js');
const { getPaintingController,editPainting,updatePainting } = require('../controllers/homeController.js');

//problema de indefinido abaixo
const validatePanting = (res, req, next) =>{
  const schema = Joi.object({
    nome: Joi.string().min(5).max(100).required(),
    ano: Joi.number().integer().min(1500).max(new Date().getFullYear()).required(),
    artista: Joi.string().min(5).max(100).required(),
    urlimagem: Joi.string().uri().required()
  });
  
  const { error } = schema.validate(req.body);
  console.log("Erro de validacao: ",error);
  if(error){
    return res.render('insertPainting.ejs', {errors: error.details, painting: req.body})
  }
  next();
  
}

const validateEditPainting = (req, res, next) =>{
  const schema = Joi.object({
    nome: Joi.string().min(1).max(45).required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter pelo meno 1 caractere',
      'string.max': 'Nome deve ter no maximo 45 caractere'
    }),
    ano: Joi.number().integer().min(1500).max(new Date().getFullYear()).required().messages({
      'number.base': 'Ano deve ser um número',
      'number.min': 'Ano deve ser maior ou igual a 1500',
      'number.max': `Ano deve ser menor ou igual a ${new Date().getFullYear()}`,
      'any.required': 'Ano é obrigatório'
    }),
    artista: Joi.string().max(45).allow('').required().messages({
      'string.max': 'Artista deve ter no maximo 45 caractere',
      'string.empty': 'Nome do Artista é obrigatório'
    })
  });

  const {error} = schema.validate(req.body, { abortEarly: false});
  console.log(`Erro de validação: ${error}`);
  if(error){
    return res.render('edit.ejs', { errors: error.details.map(e => e.message), painting: {id: req.params.id, ...req.body}});
  }
  next();

}


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
    app.get('.', function(res) {
      console.log('Rota não encontrada');
      res.status(404).render('./notfound.ejs');
    });
  },  
  portinari: (app) => {
    app.get('/portinari', function (req, res) {
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
  InsertPainting: (app) =>{
    app.get('/inserirobra', function (req, res) {
      console.log('Rota /inserirobra acionada');
      res.render('insertPainting.ejs', {errors: [], painting: []});
      });
  },
  savePainting: (app) =>{
    app.post('/obra/salvar', validatePanting, function(req, res){
      console.log('Rota /obra/salvar acionada');
      addPainting(app, req, res);
    });
  },
  getPainting: (app) => {
    app.get('/obradearte', (req, res) => {
      console.log('Rota /obradearte acionada')
      getPaintingController(app, req, res);
    });
  },
  editPainting: (app) => {
    app.get('/obradearte/:id/edit', (req, res) => {
      console.log('Rota /obradearte/:id acionada');
      require('../controllers/homeController.js').editPainting(app, req, res);
    });
  },
  updatePainting: (app) => {
    app.put('/obradearte/:id', validateEditPainting, (req, res)=>{
      console.log('Rota /obradearte/:id acionada');
      require('../controllers/homeController.js').updatePainting(app, req, res);
    });
  }
};
