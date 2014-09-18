var Liquor = require('../../modules/Liquor');
var liquorView = require('../../shared/views/liquor');
var searchModule = require('../../shared/modules/search');

var doQuery = function (term, liquors) {
  Liquor.getAll(term).then(liquors);
};

module.exports = searchModule(liquorView, doQuery);
