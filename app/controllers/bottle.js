var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list('bottle', 'where volume_ml > 0 order by added desc');
exports.search = common.list('bottle');

exports.get = common.get('bottle', "product_id");

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
    added: new Date(),
    sacred: body.sacred,
    owner_name: req.session.passport.user.name
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
    mysql.query("insert into bottle set ?", bottle, function (error, result) {
      queryError(error);
      mysql.query("update user set balance = balance +"+body.price, function (error, result2) {
        queryError(error);
        mysql.commit(function (error) {
          queryError(error);
          common.createOk(req, res, result);
        });
      });
    });
  });
};
