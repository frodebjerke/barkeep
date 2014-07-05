(function (bke) {
  bke.views.search = function (itemview) {
    return function (ctrl) {
      return m(".el-search", [
        m(".search-bar.row", [
          m("input", {
            onchange: m.withAttr("value", ctrl.doQuery),
            value: ctrl.query()
          })
        ]),
        m(".search-results", ctrl.result().map(function (res) {
          return m(".search-result.col-xs-6.col-sm-4.col-md-3.col-lg-2", itemview(res));
        }))
      ]);
    };
  };
})(window.bke = window.bke || {});
