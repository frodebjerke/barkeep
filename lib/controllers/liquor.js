var mongoose = require("mongoose");
var Liquor = mongoose.model('Liquor');
var common = require("./common");

exports.list = function (req, res) {
  Liquor.find({}).sort({'logged': 'desc'}).limit(15).exec(function (err, result) {
    if (err) common.error(err, res);
    res.send(result);
  });
};

exports.search = function (req, res) {
  Liquor.find({name: {$regex: req.params.query, $options: 'i'}}).sort({'logged': 'desc'}).limit(30).exec(function (err, out) {
    if (err) common.error(err, res);
    res.send(out.map(function (e) {
      return e;
    }));
  });
};

exports.get = function (req, res) {
  Liquor.findOne({_id: req.params.productno}, function (err, liquor) {
    if (err) common.error(err, res);
    res.send(liquor);
  });
};

exports.post = function (req, res) {
  var data = req.body;
  Liquor.create(data, function (err, result) {
    if (err) common.error(err, res);
    common.createOk(req, res, {insertId: result._id});
  });
};
