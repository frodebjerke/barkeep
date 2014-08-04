var common = require('./common');
var mq = require('../../lib/db/mysql/query');
var util = require('util');
var mongoose = require('mongoose');
var Liquor = mongoose.model('Liquor');
var Q = require('Q');

exports.list = common.list('bottle', 'where volume_ml > 0 order by added desc');
exports.search = common.list('bottle');

exports.get = common.get('bottle', "id");

exports.create = function (req, res) {
  var body = req.body;
  var bottle = {
    product_id: body.liquor._id,
    name: body.liquor.name,
    category: body.liquor.category.primary,
    owner_id: body.owner.id,
    price_nok: body.product.price,
    volume_ml: body.product.size_ml,
    size_ml: body.product.size_ml,
    image_thumb: body.liquor.images ? body.liquor.images.thumb : "",
    image: body.liquor.images ? body.liquor.images.large : "",
    added: new Date(),
    sacred: body.sacred,
    owner_name: util.format("%s %s", body.owner.firstname, body.owner.lastname)
  };

  var userQuery = "update user set balance = balance +"+body.product.price +" where id = "+ body.owner.id;

  var q = mq.query();
  var insertRes = {};

  q.getConnection()
    .then(q.beginTransaction)
    .then(q.insert("insert into bottle set ?", bottle))
    .then(function(result) {
      var defer = Q.defer();
      insertRes.insertId = result.insertId;
      defer.resolve();
      return defer.promise;
    })
    .then(q.exec(userQuery))
    .then(q.commit)
    .fail(q.rollback)
    .finally(q.release)
    .done(common.createOk.bind(null, req, res, insertRes));

  updateProduct(body.liquor._id, body.product);
};

var addProduct = function (id, product) {
  product.price_updated = new Date();
  product.logged = 1;
  Liquor.update({
    _id: id
  }, {
    $inc: {logged: 1},
    $push: {products: product}
  }).exec(function (err, numAffected) {

  });
};

var updateProduct = function (id, product) {
  Liquor.update({
    _id: id,
    'products.size_ml': product.size_ml
  }, {
    $inc: {'products.$.logged': 1, logged: 1},
    $set: {
      'products.$.price_updated': new Date(),
      'products.$.price': product.price
    }
  }, {}, function (err, numAffected, more) {
    if (err) console.log(err);
    if (numAffected === 0)
      addProduct(id, product);
  });
};
