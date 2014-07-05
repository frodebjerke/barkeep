var mysql = require('mysql');

var host = process.env.MYSQL_HOST || 'localhost';
var user = process.env.MYSQL_USER || 'barkeep';
var pw = process.env.MYSQL_PW || 'en gang i blandt';
var db = process.env.MYSQL_DB || 'barkeep';


var conf = process.env.CLEARDB_DATABASE_URL || {
  connectionLimit : 10,
  host: host,
  user: user,
  password: pw,
  database: db
};

function handleDisconnect () {
  connection = mysql.createConnection(conf); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

console.log("Mysql connected");

connection.query("use "+db+";");

module.exports = connection;
