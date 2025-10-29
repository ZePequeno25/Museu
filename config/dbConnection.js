const mysql = require('mysql2');

const host = 'localhost';
const database = 'museu';
const user = 'ifsp';
const password = 'ifsp';

// Aqui está sendo exportada uma função que precisa ser executada por quem a chama para que a conexão seja feita.
const conn = mysql.createConnection({
  host: host,
  user: user,
  password: password, 
  database: database
});

conn.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL!');
});

module.exports = conn;
