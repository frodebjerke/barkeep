var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list('bottle');

exports.get = common.get('bottle');

exports.create = function (req, res) {
  var data = req.body;

  data.added = new Date();
  data.content_ml = data.volume_ml;

  var query = "insert into bottle set ?";
  if (validate(data))
    mysql.query(query, data, function (err, result) {
      if (err) common.error(err, res);
      common.createOk(req, res, result);
    });
  else common.validationError(res);
};

var validate = function (data) {
  var valid = true;

  if (!data.name) valid = false;
  if (!data.owner_id) valid = false;

  return valid;
};
