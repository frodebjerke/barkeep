var m = require('mithril');

var Bottle = function (data) {


};

Bottle.search = function (term) {
  return m.request({
    method: "GET",
    url: "/search/bottle/"+term()
  });
};

module.exports = Bottle;
