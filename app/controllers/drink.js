var mysql = require('../../config/mysql');
var common = require('./common');

exports.get = common.get("drink");

exports.list = common.list("drink");

exports.drink = function (req, res) {
  var data = req.body;

  var drink = {
    bottle_id: data.bottle_id,
    user_id: data.user_id,
    bottle_name: data.bottle_name,
    user_name: data.user_name,
    size: data.size,
    added: new Date()
  };

  var queryError = function (error) {
    if (error) {
      mysql.rollback(function () {
        common.error(error, res);
      });
    }
  };

  mysql.beginTransaction(function (err) {
    if (err) common.error(err, res);
    mysql.query("insert into drink set ?", drink, function (error, result) {
      queryError(error);
      mysql.query("update bottle set content_ml = content_ml - "+ data.size +" where id = "+ data.bottle_id, function (error, result2) {
        queryError(error);
        mysql.commit(function (error) {
          queryError(error);
          common.createOk(req, res, result);
        });
      });

    });


  });
};
