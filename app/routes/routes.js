const Joi = require('joi');
const { home,getPaintingController,editPainting, updatePainting,addPainting } = require('../controllers/homeController.js');
const { tarsila } = require('../controllers/tarsilaController.js');
const { portinari } = require('../controllers/portinariController.js');
const { authenticate, register } = require('../controllers/usersController.js');
const mensagemController = require("../controllers/mensagemController.js");


//validação de login
const validatelogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Senha deve ter pelo menos 8 caracteres',
      'any.required': 'Senha é obrigatória'
    })
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação de login:', error);
  if (error) {
    return res.render('authenticationform.ejs', { errors: error.details.map(e => e.message), user: req.body });
  }
  next();
};

//validação de registro
const validateRegister = (req, res, next) => {
  const schema = Joi.object({
      email: Joi.string().email().max(255).required().messages({
          'string.email': 'Email inválido',
          'string.max': 'O email deve ter no máximo 255 caracteres',
          'string.empty': 'Email Não pode ser vazio',
          'any.required': 'Email é obrigatório'
      }),
      password: Joi.string().min(8).required().messages({
          'string.min': 'Senha deve ter pelo menos 8 caracteres',
          'any.required': 'Senha é obrigatória',
          'string.empty': 'Senha não pode ser vazia'
      }),
      confirmpassword: Joi.string().required().valid(Joi.ref('password')).required().messages({
          'any.only': 'As senhas devem ser iguais',
          'any.required': 'Confirmação de senha é obrigatória',
          'string.empty': 'Confirmação de senha não pode ser vazia'
      })
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação de registro:', error);
  if (error) {
      return res.render('userform.ejs', { errors: error.details.map(e => e.message), user: req.body });
  }
  next();
};

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
    comentary: Joi.string().min(1).max(255).required().messages({
      'string.empty': 'Comentário é obrigatório',
      'string.min': 'Comentário deve ter pelo menos 1 caractere',
      'string.max': 'Comentário deve ter no máximo 255 caracteres'
    }),
    id_obradearte: Joi.number().integer().min(1).required().messages({
      'number.base': 'ID da obra deve ser um número',
      'number.min': 'ID da obra deve ser maior ou igual a 1',
      'any.required': 'ID da obra é obrigatório'
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  console.log('Erro de validação de comentário:', error);
  if (error) {
    return res.redirect(`/obradearte?idobra=${req.body.id_obradearte || ''}&error=${encodeURIComponent(error.details.map(e => e.message).join('; '))}`);
  }
  next();
};

module.exports = {
    home: (app) => {
      console.log('Rota /home criada');
      app.get('/home', (req, res) => {
        console.log('Rota /home acionada');
        home(app, req, res); //Controller da home
      });
    },
    tarsila: (app) => {
      app.get('/tarsila', (req, res) => {
        console.log('Rota /tarsila acionada');
        tarsila(app, req, res);
      });
    },  
    portinari: (app) => {
      app.get('/portinari', (req, res) => {
        console.log('Rota /portinari acionada');
        portinari(app, req, res);
      });
    },
    enviaMensagem: (app) => {
      app.post('/enviamensagem', validateComment, (req, res) => {
        console.log('Rota /enviamensagem acionada');
        mensagemController(app, req, res);
      });
    },
    InsertPainting: (app) => {
      app.get('/inserirobra', (req, res) => {
        console.log('Rota /inserirobra acionada');
        res.render('insertPainting.ejs', { errors: [], painting: {} });
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
        console.log("Rota /obradearte/:id/edit acionada");
        editPainting(app, req, res);
      });
    },
    updatePainting: (app) =>{
      app.post('/obradearte/:id', validateEditPainting, (req, res) => {
        console.log("Rota xxxx");
        updatePainting(app, req, res);
      });
    },
    savePainting: (app) => {
      app.post('/obra/salvar', validatePainting, (req, res)=>{
        console.log('Rota /obra/salvar acionada');
        addPainting(app, req, res);
      });
    },
    login: (app) => {
      app.get('/login', (req, res) => {
        console.log('Rota /getlogin acionada');
        res.render('authenticationform.ejs', { user: {}, errors: [] });
      });

      app.post('/login', validatelogin, (req, res) =>{
        console.log('Rota /postlogin acionada');
        authenticate(req, res);
      });
    },
    registerUser: (app) => {
      app.get('/', (req, res) => {
        console.log('Rota /register acionada');
        res.render('userform.ejs', { user: {}, errors: [] });
      });

      app.post('/register', validateRegister, (req, res) => {
        console.log('Rota /register acionada');
        register(req, res);
      });
    },

    //sempre o ultimo
    routeNotFound: (app) => {
      app.use((req, res) => {
        console.log('Rota não encontrada');
        res.status(404).render('notfound.ejs');
      });
    }
};
