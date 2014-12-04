var mysql = require('../../config/mysql');
var common = require('./common');
var mq = require('../db/mysql/query');

exports.get = common.get("drink");

exports.list = common.list("drink", "order by poured desc");

exports.pourdrink = function (req, res) {
  var data = req.body;

  if (data.amount - data.bottle.voulme_ml < 0) common.error({error: "Drink size exceeded contents of bottle."});

  var drink = {
    drink_id: -1,
    user_id: req.session.passport.user.id,
    bottle_id: data.bottle.id,
    bottle_name: data.bottle.name,
    price_nok: calculatePrice(data.amount, data.bottle),
    size_ml: data.amount,
    poured: new Date(),
    user_name: req.session.passport.user.name
  };

  var updateBottle = "update bottle set volume_ml = volume_ml - "+ data.amount +" where id = "+ data.bottle.id;
  var updateUser = "update user set balance = balance -"+drink.price_nok +" where id = "+ drink.user_id;
  var q = mq.query();
  var insertRes = {};

  q.getConnection()
    .then(q.beginTransaction)
    .then(q.insert("insert into drink set ?", drink))
    .then(function (result) {
      insertRes.insertId = result.insertId;
    })
    .then(q.exec(updateBottle))
    .then(q.exec(updateUser))
    .then(q.commit)
    .fail(q.rollback)
    .finally(q.release)
    .done(common.createOk.bind(null, req, res, insertRes));
};

var calculatePrice = function (drinksize, bottle) {
  return (drinksize / bottle.size_ml) * bottle.price_nok;
};
