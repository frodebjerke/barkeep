var mysql = require('mysql');

var host = process.env.MYSQL_HOST || 'localhost';
var user = process.env.MYSQL_USER || 'barkeep';
var pw = process.env.MYSQL_PW || 'en gang i blandt';
var db = process.env.MYSQL_DB || 'barkeep';

var connection = mysql.createConnection({
  connectionLimit : 10,
  host: host,
  user: user,
  password: pw,
  database: db
});

console.log("Mysql connected");

connection.query("use barkeep;");

module.exports = connection;
