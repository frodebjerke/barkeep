var common = require('./common');
var mysql = require('../../config/mysql');

exports.list = common.list('bottle');
exports.search = common.list('bottle');

exports.get = common.get('bottle');

exports.create = function (req, res) {
  var body = req.body;
  var bottle = {
    product_id: body.liquor.product_no,
    name: body.liquor.name,
    category: body.liquor.primary_category,
    owner_id: req.session.passport.user,
    price_nok: body.price,
    volume_ml: body.liquor.volume_in_milliliters,
    size_ml: body.liquor.volume_in_milliliters,
    image_thumb: body.image_thumb_url,
    added: new Date(),
    sacred: body.sacred
  };

  var query = "insert into bottle set ?";
  if (validate(bottle))
    mysql.query(query, bottle, function (err, result) {
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
