(function (bke) {

  var doQuery = function (term, liquors) {
    bke.Liquor.getAll(term).then(liquors);
  };

  bke.addbottle.liquorlist = bke.modules.search(bke.views.liquor, doQuery);
})(window.bke = window.bke || {});
