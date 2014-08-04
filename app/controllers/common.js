var mq = require('../../lib/db/mysql/query');
var util = require('util');

exports.list = function (table, moresql) {
  var offset = 0;
  var limit = 20;
  moresql = moresql || "";

  return function (req, res) {
    limit = req.query.limit || limit;
    var query = util.format(
      'select * from %s %s limit %s, %s ',table, moresql, offset, limit
    );

    var q = mq.query();
    q.getConnection()
      .then(q.exec(query))
      .done(function (result) {
        res.send(result);
      });
  };
};

exports.get = function (table, on) {
  on = on || "id";
  return function (req, res) {
    var id = req.params.id;

    var query = util.format(
      "select * from %s where %s = %s",
      table, on, id
    );

    var q = mq.query();
    q.getConnection()
      .then(q.exec(query))
      .done(function (result) {
        if (result.length < 1) res.send({error: "Not found"}, 400);
        else res.send(result[0]);
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
