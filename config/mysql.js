var mysql = require('mysql');

var host = process.env.MYSQL_HOST || 'localhost';
var user = process.env.MYSQL_USER || 'barkeep';
var pw = process.env.MYSQL_PW || 'en gang i blandt';
var db = process.env.MYSQL_DB || 'barkeep';


var conf = process.env.CLEARDB_DATABASE_URL || {
  connectionLimit : 10,
  host: host,
  user: user,
  password: pw
};

var pool = mysql.createPool(conf);

console.log("Mysql pool created");

// connection.query("use "+db+";");


module.exports = pool;
