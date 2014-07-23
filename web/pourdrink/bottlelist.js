(function (bke) {
  var doQuery = function (term, bottles) {
    m.request({
      method: "GET",
      url: "/search/bottle/"+term()
    }).then(bottles);
  };

  bke.bottlelist = bke.modules.search(bke.views.bottle, doQuery);
})(window.bke = window.bke || {});
