var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list('bottle', 'where volume_ml > 0 order by added desc');
exports.search = common.list('bottle');

exports.get = common.get('bottle', "id");

exports.create = function (req, res) {
  var body = req.body;
  var bottle = {
    product_id: body.liquor.product_no,
    name: body.liquor.name,
    category: body.liquor.primary_category,
    owner_id: req.session.passport.user.id,
    price_nok: body.price,
    volume_ml: body.liquor.volume_in_milliliters,
    size_ml: body.liquor.volume_in_milliliters,
    image_thumb: body.liquor.image_thumb_url,
    image: body.liquor.image_url,
    added: new Date(),
    sacred: body.sacred,
    owner_name: req.session.passport.user.name
  };



  mysql.getConnection(function (err, connection) {
    if (err) common.error(err, res);
    var queryError = function (error) {
      if (error) {
        connection.rollback(function () {
          common.error(error, res);
          connection.release();
        });
      }
    };
    connection.beginTransaction(function (err) {
      if (err) common.error(err, res);
      connection.query("insert into bottle set ?", bottle, function (error, result) {
        queryError(error);
        connection.query("update user set balance = balance +"+body.price, function (error, result2) {
          queryError(error);
          connection.commit(function (error) {
            queryError(error);
            common.createOk(req, res, result);
            connection.release();
          });
        });
      });
    });
  });
};
