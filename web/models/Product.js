var m = require('mithril');

var Product = function (data) {
  this.price = m.prop(data.price || 0);
  this.size_ml = m.prop(data.size_ml);
  this.units = m.prop(data.units);
  this.material = m.prop(data.material);
};

Product.ctor = function (data) {
  return new Product(data);
};

module.exports = Product;
