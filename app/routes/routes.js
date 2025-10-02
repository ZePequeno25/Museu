const Joi = require('joi');
const { home,getPaintingController,editPainting, updatePainting } = require('../controllers/homeController.js');
const { tarsila } = require('../controllers/tarsilaController.js');
const { portinari } = require('../controllers/portinariController.js');
const mensagemController = require("../controllers/mensagemController.js");

//validação de pinturas
const validatePainting = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(1).max(45).required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter pelo menos 1 caractere',
      'string.max': 'Nome deve ter no máximo 45 caracteres'
    }),
    ano: Joi.number().integer().min(1500).max(new Date().getFullYear()).required().messages({
      'number.base': 'Ano deve ser um número',
      'number.min': 'Ano deve ser maior ou igual a 1500',
      'number.max': `Ano deve ser menor ou igual a ${new Date().getFullYear()}`,
      'any.required': 'Ano é obrigatório'
    }),
    artista: Joi.string().max(45).allow('').optional().messages({
      'string.max': 'Artista deve ter no máximo 45 caracteres'
    }),
    urlimagem: Joi.string().uri().required().messages({
      'string.uri': 'URL da imagem deve ser válida',
      'any.required': 'URL da imagem é obrigatória'
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação:', error);
  if (error) {
    return res.render('insertPainting.ejs', { errors: error.details.map(e => e.message), painting: req.body });
  }
  next();
};

//validação de editar pintura
const validateEditPainting = (req, res, next) => {
  const schema = Joi.object({
    nome: Joi.string().min(1).max(45).required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter pelo menos 1 caractere',
      'string.max': 'Nome deve ter no máximo 45 caracteres'
    }),
    ano: Joi.number().integer().min(1500).max(new Date().getFullYear()).required().messages({
      'number.base': 'Ano deve ser um número',
      'number.min': 'Ano deve ser maior ou igual a 1500',
      'number.max': `Ano deve ser menor ou igual a ${new Date().getFullYear()}`,
      'any.required': 'Ano é obrigatório'
    }),
    artista: Joi.string().max(45).allow('').optional().messages({
      'string.max': 'Artista deve ter no máximo 45 caracteres'
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação:', error);
  if (error) {
    return res.render('edit.ejs', { 
      errors: error.details.map(e => e.message), 
      painting: { id: req.params.id, ...req.body }
    });
  }
  next();
};

const validateComment = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(255).required().messages({
      'string.empty': 'Comentário é obrigatório',
      'string.min': 'Comentário deve ter pelo menos 1 caractere',
      'string.max': 'Comentário deve ter no máximo 255 caracteres'
    }),
    idObra: Joi.number().integer().min(1).required().messages({
      'number.base': 'ID da obra deve ser um número',
      'number.min': 'ID da obra deve ser maior ou igual a 1',
      'any.required': 'ID da obra é obrigatório'
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação de comentário:', error);
  if (error) {
    return res.redirect(`/obradearte?idobra=${req.body.idObra || ''}&error=${encodeURIComponent(error.details.map(e => e.message).join('; '))}`);
  }
  next();
};

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
  routeNotFound: (app) => {
    app.use((req, res) => {
      console.log('Rota não encontrada');
      res.status(404).render('notfound.ejs');
    });
  },  
  portinari: (app) => {
    app.get('/portinari', (req, res) => {
      console.log('Rota /portinari acionada');
      portinari(app, req, res);
    });
  },
  enviaMensagem: (app) => {
    app.post('/enviaMensagem', validateComment, (req, res) => {
      console.log('Rota /enviaMensagem acionada');
      mensagemController(app, req, res);
    });
  },
  getPainting: (app) => {
    app.get('/obradearte', (req,res)=>{
      console.log("Rota /obradearte acionada");
      getPaintingController(app,req,res);
    });
  },
  editPainting: (app) =>{
    app.get('/obrasdearte/:id/edit', (req, res) => {
      console.log("Rota /obradearte/:id/editar acionada");
      editPainting(app, req, res);
    });
  },
  updatePainting: (app) =>{
    app.put('/obradearte/:id', validateEditPainting, (req, res) => {
      console.log("Rota /obradearte/:id acionada para update");
      updatePainting(app, req, res);
    });
  }
};
