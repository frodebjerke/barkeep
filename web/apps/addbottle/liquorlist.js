var Liquor = require('../../models/Liquor');
var liquorView = require('../../shared/views/liquor');
var searchModule = require('./liquor-search');

var doQuery = function (term, liquors) {
  var linkToNewLiquor = function () {
    liquors().push(new Liquor({
      name: "Add new",
      _id: "new"
    }));
  };

  Liquor.getAll(term).then(liquors).then(linkToNewLiquor);
};

module.exports = searchModule(liquorView, doQuery);
