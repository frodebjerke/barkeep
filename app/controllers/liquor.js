var mongoose = require("mongoose");
var Liquor = mongoose.model('Liquor');
var common = require("./common")

exports.search = function (req, res) {
  Liquor.textSearch(req.params.query, function (err, out) {
    if (err) common.error(err, res);

    res.send(out.results.map(function (e) {
      var l = e.obj;
      imageOrDummy(l);
      return l;
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
