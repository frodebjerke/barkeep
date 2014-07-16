(function (bke) {

  bke.views.search = function (itemview) {
    return function (ctrl) {
      var last_req;
      var debounce = function (arg) {
        if (!last_req || new Date().getTime() - last_req > 200) {
          ctrl.doQuery(arg);
          last_req = new Date().getTime();
        }
      };
      return m(".el-search", [
        m(".search-bar", [
          m("input.col-xs-11.col-md-8", {
            autofocus: "autofocus",
            placeholder: "Search ...",
            onchange: m.withAttr("value", ctrl.doQuery),
            onkeyup: m.withAttr("value", debounce),
            value: ctrl.query()
          }),
          m(".clearfix")
        ]),
        m(".search-results", ctrl.result().map(function (res) {
          return m(".search-result.col-xs-6.col-sm-4.col-md-3.col-lg-2", itemview(res));
        }))
      ]);
    };



  };
})(window.bke = window.bke || {});
