var m = require('mithril');

var Drink = function (data) {
  this.id = m.prop(data.id);
  this.drink_id = m.prop(data.drink_id);
  this.user_id = m.prop(data.user_id);
  this.bottle_id = m.prop(data.bottle_id);
  this.size_ml = m.prop(data.size_ml);
  this.price_nok = m.prop(data.price_nok);
  this.poured = m.dateprop(data.poured);
  this.user_name = m.prop(data.user_name);
  this.bottle_name =  m.prop(data.bottle_name);
};

Drink.getAll = function () {
  return m.request({
    method: "GET",
    url: "/api/drinks",
    type: Drink
  });
};

module.exports = Drink;
