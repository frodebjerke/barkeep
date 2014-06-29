var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list("user");

exports.get = common.get("user");

exports.create = function (req, res) {
  var data = req.body;
  var query = "insert into user set ?";
  if (validate(data))
    mysql.query(query, data, function (err, result) {
      if (err) common.error(err, res);
      common.createOk(req, res,result);
    });
  else common.validationError(res);
};

var validate = function (data) {
  return !(!data.firstname && !data.lastname);
};
