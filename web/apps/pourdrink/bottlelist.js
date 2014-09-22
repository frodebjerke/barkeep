var m = require('mithril');
var searchModule = require('../../shared/modules/search');
var bottleView = require('../../shared/views/bottle');
var Bottle = require('../../models/Bottle');

var doQuery = function (term, bottles) {
  Bottle.search(term).then(bottles);
};

module.exports = searchModule(bottleView, doQuery);
