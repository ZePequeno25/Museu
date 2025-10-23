const dbConnection = require('../../config/dbConnection');


module.exports.authenticate = (req, res, next) => {
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

            res.redirect('/'); // Redireciona para a área restrita
        }else{
            console.log('Falha na autenticação do usuário');
            res.send('Falha na autenticação do usuário. Usuário ou senha inválidos.');

        }
    });
}