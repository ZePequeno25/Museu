const { authenticateUser, registerUser } = require('../models/usersModels');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    authenticate: (req, res) => {
        console.log('[Controller authenticate]');
        const user = req.body;
        console.log(user);
        
        authenticateUser(user, dbConnection, (error, result) => {
            console.log('[User AUTH controller error]:', error);
            console.log('[User AUTH controller result]:', result);
        
            if (error) {
                console.error('Erro no banco de dados:', error);
                return res.status(500).render('authenticationform.ejs', { 
                    errors: ['Erro interno do servidor'], 
                    user: req.body 
                });
            }

            if (result.length > 0) {
                console.log('Usuario autenticado com sucesso');
                console.log('Dados do usuario:', result[0]);
                req.session.user = {
                    id: result[0].userid,
                    email: result[0].email
                };
                console.log('User controller req.session', req.session);
                res.redirect('/home'); // Redireciona para a página inicial
            } else {
                console.log('Falha na autenticação do usuário');
                res.render('authenticationform.ejs', { 
                    errors: ['Usuário ou senha inválidos'], 
                    user: req.body 
                });
            }
        });
    },
    
    register: (req, res) => {
        console.log('[Controller register]');
        const user = req.body;
        console.log('req.body:', req.body);

        registerUser(user, dbConnection, (error, result) => {
            console.log('[User REGISTER controller error]:', error);
            console.log('[User REGISTER controller result]:', result);

            if (error) {
                console.error('Erro no registro do usuário:', error);
                let errorMessage = error.message || 'Erro ao registrar usuário';
                if (error.code === 'ER_DUP_ENTRY') {
                    errorMessage = 'Email já registrado';
                } else if (error.code === 'ER_DATA_TOO_LONG') {
                    errorMessage = 'O email fornecido é muito longo';
                }
                return res.status(400).render('userform.ejs', {
                    errors: [errorMessage],
                    user: req.body
                });
            }

            if (result.affectedRows > 0) {
                console.log('Usuário registrado com sucesso');
                res.redirect('/login',{user: req.body, errors: []}); // Redireciona para a página de login
            } else {
                console.log('Falha no registro do usuário: nenhum registro inserido');
                res.status(500).render('userform.ejs', {
                    errors: ['Erro ao registrar usuário: nenhum registro inserido'],
                    user: req.body
                });
            }
        });
    }
};