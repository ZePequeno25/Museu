const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  database: 'museu',
  user: 'ifsp',
  password: 'ifsp',
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = db;
