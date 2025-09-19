const mysql = require('mysql2');

const host = 'localhost';
const database = 'museu';
const user = 'root';
const password = 'ifsp';

// Aqui está sendo exportada uma função que precisa ser executada por quem a chama para que a conexão seja feita.

module.exports = () => {
  return mysql.createConnection({
      host: host,
      user: user,
      password: password, 
      database: database
    });
}
