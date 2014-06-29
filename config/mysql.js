var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'barkeep',
  password: 'en gang i blandt',
  database: 'barkeep'
});

connection.query("use barkeep;");

module.exports = connection;
