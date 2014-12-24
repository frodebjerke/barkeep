var m = require('mithril');
var _ = require('lodash');
var Product = require('./Product');

var Liquor = function (data) {
  if (!_.isArray(data.products)) data.products = [];

  this._id = m.prop(data._id);
  this.name = m.prop(data.name);
  this.updated_at = m.prop(data.updated_at);
  this.logged = m.prop(data.logged);
  this.products = m.prop(data.products.map(Product.ctor));
  this.contents = m.prop(data.contents);
  this.notes = m.prop(data.notes);
  this.category = m.prop(data.category);
  this.images = m.prop(data.images);
  this.about = m.prop(data.about);
};

Liquor.getById = function (id) {
  return m.request({
    method: "GET",
    url: "/api/liquor/"+ id,
    type: Liquor
  });
};

Liquor.getAll = function (term) {
  return m.request({
    method: "GET",
    url: "/search/liquor/"+ term(),
    type: Liquor
  });
};

Liquor.create = function (data) {
  return m.request({
    method: "POST",
    url: "/api/liquor",
    data: data
  });
};

module.exports = Liquor;
