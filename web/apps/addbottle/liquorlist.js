var Liquor = require('../../modules/Liquor');
var liquorView = require('../../shared/views/liquor');
var searchModule = require('../../shared/modules/search');

var doQuery = function (term, liquors) {
  var linkToNewLiquor = function () {
    liquors().push({
      name: "Add new",
      _id: "new"
    });
  };
  
  Liquor.getAll(term).then(liquors).then(linkToNewLiquor);
};

module.exports = searchModule(liquorView, doQuery);
