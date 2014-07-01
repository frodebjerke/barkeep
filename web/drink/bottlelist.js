(function (bke) {
  bke.bottlelist = {
    controller: function () {
      var query = m.prop("");
      var bottles = m.prop([]);

      var doQuery = function (term) {
        query(term);
        m.request({
          method: "GET",
          url: "/search/bottle/"+query()
        }).then(bottles);
      };

      doQuery("");

      return {
        result: bottles,
        query: query,
        doQuery: doQuery
      };
    },
    view: bke.views.search(bke.views.bottle)
  };
})(window.bke = window.bke || {});
