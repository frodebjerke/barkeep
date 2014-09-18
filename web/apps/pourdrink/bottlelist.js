var m = require('mithril');
var searchModule = require('../../shared/modules/search');
var bottleView = require('../../shared/views/bottle');

var doQuery = function (term, bottles) {
  m.request({
    method: "GET",
    url: "/search/bottle/"+term()
  }).then(bottles);
};

module.exports = searchModule(bottleView, doQuery);
