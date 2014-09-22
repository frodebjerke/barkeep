var m = require('mithril');

var Liquor = function (data) {

};

Liquor.getById = function (id) {
  return m.request({
    method: "GET",
    url: "/api/liquor/"+ id
  });
};

Liquor.getAll = function (term) {
  return m.request({
    method: "GET",
    url: "/search/liquor/"+ term()
  });
};

module.exports = Liquor;
