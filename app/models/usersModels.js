const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    registerUser: (user, conn, callback) => {
        console.log('[User Model]', user);
        // Validação para evitar erros de undefined
        if (!user || !user.email || !user.password) {
            return callback(new Error('Dados do usuário incompletos'), null);
        }

        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Erro ao hashear a senha:', err);
                return callback(err);
            }

            const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
            console.log('[User Model SQL]', sql);
            conn.query(sql, [user.email, hash], callback);
        });
    },

    authenticateUser: (user, conn, callback) => {
        console.log('[User Model]', user);
        // Validação para evitar erros de undefined
        if (!user || !user.email || !user.password) {
            return callback(new Error('Dados do usuário incompletos'), null);
        }

        const sql = `SELECT * FROM users WHERE email = ?`;
        console.log('[User Model SQL]', sql);
        conn.query(sql, [user.email], (err, results) => {
            if (err) {
                console.error('Erro ao autenticar usuário:', err);
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, []);
            }
            bcrypt.compare(user.password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Erro ao comparar senhas:', err);
                    return callback(err);
                }
                if (isMatch) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            });
        });
    },
};