var m = require('mithril');

var Bottle = function (data) {
  this.id = m.prop(data.id);
  this.product_id = m.prop(data.product_id);
  this.name = m.prop(data.name);
  this.category = m.prop(data.category);
  this.owner_id = m.prop(data.owner_id);
  this.price_nok = m.prop(data.price_nok);
  this.volume_ml = m.prop(data.volume_ml);
  this.size_ml = m.prop(data.size_ml);
  this.added = m.dateprop(data.added);
  this.image_thumb = m.prop(data.image_thumb);
  this.image = m.prop(data.image);
  this.owner_name =  m.prop(data.owner_name);
};

Bottle.getAll = function (data) {
  return m.request({
    method: "GET",
    url: "/api/bottles",
    type: Bottle,
    data: data || {}
  });
};

Bottle.search = function (term) {
  return m.request({
    method: "GET",
    url: "/search/bottle/"+term(),
    type: Bottle
  });
};

module.exports = Bottle;
