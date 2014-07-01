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
        m(".search-results", ctrl.result().map(itemview))
      ]);
    };
  };
})(window.bke = window.bke || {});
