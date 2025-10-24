module.exports ={
    registerUser: (user, conn, callback) => {
        console.log('[User Model', user);
        const sql = `INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}");`;
        console.log('[User Model SQL', sql);
        conn.query(sql, callback);
    },

    authenticateUser: (user, conn, callback) => {
        console.log('[User Model', user);
        const sql = `SELECT * FROM users WHERE email = "${user.email}" AND password = "${user.password}";`;
        console.log('[User Model SQL', sql);
        conn.query(sql, callback)
    },
}