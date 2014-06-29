(function () {
  var liquorlist = {
    controller: function () {
      var query = m.prop("");
      var liquors = m.prop([]);

      var doQuery = function (term) {
        query(term);
        m.request({method: "GET", url: "/search/liquor/"+ query()}).then(liquors);
      };
      doQuery("vodka");
      return {
        result: liquors,
        query: query,
        doQuery: doQuery
      };
    },
    view: function (ctrl) {
      return m(".el-search", [
        m(".search-bar.row", [
          m("input", {onchange: m.withAttr("value", ctrl.doQuery), value: ctrl.query()})
        ]),
        m(".search-results", ctrl.result().map(this.liquorview))
      ]);
    },
    liquorview: function (liquor) {
      return m(".el-liquor.col-xs-12.col-sm-6.col-md-4.col-lg-3", {
        onclick: function () {
          m.route("/add")
        }
      },[
        m("img.col-xs-2", {src: liquor.image_thumb_url}),
        m(".liquor-name.col-xs-10", liquor.name)
      ]);
    }
  };

  var addbottle = {
    controller: function (liquorid) {
      liquorid = liquorid || m.route.param("id")
    },
    view: function () {

    }
  }

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": liquorlist,
    "/addbottle": addbottle,
    "/addbottle/:id": addbottle
  });
})();
