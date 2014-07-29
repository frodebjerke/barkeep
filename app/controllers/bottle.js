var common = require('./common');
var mysql = require('../../config/mysql');
var util = require('util');
var mongoose = require('mongoose');
var Liquor = mongoose.model('Liquor');

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
    image_thumb: body.liquor.images.thumb ,
    image: body.liquor.images.large,
    added: new Date(),
    sacred: body.sacred,
    owner_name: util.format("%s %s", body.owner.firstname, body.owner.lastname)
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

        var query = "update user set balance = balance +"+body.product.price +" where id = "+ body.owner.id;

        connection.query(query, function (error, result2) {
          queryError(error);
          connection.commit(function (error) {
            queryError(error);
            common.createOk(req, res, result);
            connection.release();
            updateProduct(bottle.product_id, body.product);
          });
        });
      });
    });
  });
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
}

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
    if (numAffected == 0)
      addProduct(id, product);
  });
};
