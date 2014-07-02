var mysql = require('mysql');

var connection = mysql.createConnection({
  connectionLimit : 10,
  host: 'localhost',
  user: 'barkeep',
  password: 'en gang i blandt',
  database: 'barkeep'
});

console.log("Mysql connected");

connection.query("use barkeep;");

module.exports = connection;
