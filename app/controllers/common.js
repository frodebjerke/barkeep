var mysql = require('../../config/mysql');

exports.list = function (table) {
  return function (req, res) {
    mysql.query('select * from '+table, function (err, rows, fields) {
      if (err) exports.error(err, res);
      res.send(rows);
    });
  };
};

exports.get = function (table) {
  return function (req, res) {
    var id = req.params.id;

    var query = "select * from "+ table +" where id = " + id;

    mysql.query(query, function (err, rows, fields) {
      if (err) exports.error(err, res);
      if (rows.length < 1) res.send({error: "Not found"}, 400);
      res.send(rows[0]);
    });
  };
};

exports.error = function (err, res) {
  res.send(err);
  console.error(JSON.stringify(err));
  throw err;
};

exports.createOk = function (req, res, result) {
  res.send({url: req.url + "/" + result.insertId, id: result.insertId}, 200);
  console.log("Created: "+ req.url + "/" + result.insertId);
};

exports.validationError = function (res) {
  res.send({error: "Validation"}, 400);
};