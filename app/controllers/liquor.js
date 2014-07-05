var mongoose = require("mongoose");
var Liquor = mongoose.model('Liquor');
var common = require("./common");

exports.list = function (req, res) {
  Liquor.find({}).limit(100).exec(function (err, result) {
    if (err) common.error(err, res);
    result.forEach(imageOrDummy);
    res.send(result);
  });
};

exports.search = function (req, res) {
  Liquor.find({name: {$regex: req.params.query, $options: 'i'}}).limit(30).exec(function (err, out) {
    if (err) common.error(err, res);
    res.send(out.map(function (e) {
      imageOrDummy(e);
      return e;
    }));
  });
};

exports.get = function (req, res) {
  Liquor.findOne({product_no: req.params.productno}, function (err, liquor) {
    if (err) common.error(err, res);
    imageOrDummy(liquor);
    res.send(liquor);
  });
};

var imageOrDummy = function (liquor) {
  liquor.image_url = liquor.image_url || "static/dummy.jpg";
  liquor.image_thumb_url = liquor.image_thumb_url || "static/dummy.jpg";
};
