var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list("user");

exports.get = common.get("user");

exports.me = function (req, res) {
  req.params.id = req.session.passport.user.id;
  common.get("user")(req, res);
};

exports.create = function (req, res) {
  var data = req.body;
  data.balance = 0;
  var query = "insert into user set ?";
  if (validate(data))
    mysql.getConnection(function (err, connection) {
      connection.query(query, data, function (err, result) {
        if (err) common.error(err, res);
        common.createOk(req, res,result);
        connection.release();
      });
    });
  else common.validationError(res);
};

exports.authenticate = function (profile, cb) {
  var data = {
    id: profile.id,
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    balance: 0
  };

  var query = "insert ignore into user set ?";
  mysql.query(query, data, function (err, result) {
    cb(null, {id: data.id, name: data.firstname + " " + data.lastname});
  });
};

var validate = function (data) {
  return !(!data.firstname && !data.lastname);
};
