(function (bke) {

  var doQuery = function (term, liquors) {
    m.request({
      method: "GET",
      url: "/search/liquor/"+ term()
    }).then(liquors);
  };

  bke.addbottle.liquorlist = bke.modules.search(bke.views.liquor, doQuery);
})(window.bke = window.bke || {});
