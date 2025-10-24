const { authenticateUser, registerUser } = require('../models/usersModels');
const dbConnection = require('../../config/dbConnection');


module.exports={
    authenticate: (req, res, next) => {
        console.log('[Controller authenticate]');
        const user = req.body;
        console.log(user);

        conn = dbConnection();
        authenticateUser(user, conn, (error, result) => {
            console.log('[User AUTH controller error]:', error);
            console.log('[User AUTH controller result]:', result);

            if(result.legth > 0){
                console.log('Usuario autenticado com sucesso');
                console.log('Dados do usuario:', result[0]);
                user = result[0];
                console.log('User controller req.session', req.session);
                req.session.user ={
                    id: user.userid,
                    email: user.email
                };
                console.log('User controller req.session', req.session);

                res.render('/'); // Redireciona para a área restrita
            }else{
                console.log('Falha na autenticação do usuário');
                res.send('Falha na autenticação do usuário. Usuário ou senha inválidos.');

            }

            res.render('authenticationform.ejs', { user: {} });
        });
    },

    register: (req, res, next) => {
        console.log('[Controller register]');
        const user = req.body;
        console.log(user);

        conn = dbConnection();
        registerUser(user, conn, (error, result) => {
            console.log('[User REGISTER controller error]:', error);
            console.log('[User REGISTER controller result]:', result);

            if(!error){
                console.log('Usuário registrado com sucesso');
                res.redirect('/login'); // Redireciona para a página de login
            }else{
                console.log('Falha no registro do usuário');
                res.send('Falha no registro do usuário');
            }
        });
    }
}