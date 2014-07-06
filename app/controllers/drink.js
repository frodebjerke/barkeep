var mysql = require('../../config/mysql');
var common = require('./common');

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
      connection.query("insert into drink set ?", drink, function (error, result) {
        queryError(error);
        connection.query("update bottle set volume_ml = volume_ml - "+ data.amount +" where id = "+ data.bottle.id, function (error, result2) {
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

var calculatePrice = function (drinksize, bottle) {
  return (drinksize / bottle.size_ml) * bottle.price_nok;
};
