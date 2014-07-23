(function (bke) {

  bke.modules.search = function (itemview, doQuery) {
    return {
      controller: function () {
        var query = m.prop("");
        var result = m.prop([]);
        var timer;

        doQuery(query, result);
        
        return {
          debounce: function (term) {
              query(term);
              timer && clearTimeout(timer);
              timer = setTimeout(function () {
                  doQuery(query(), result);
                }, 300);
          },
          query: query,
          result: result
        };
      },
      view: function (ctrl) {
        return m('.el-search', [
          searchbar(ctrl.query, ctrl.debounce),
          results(ctrl.result, itemview)
        ]);
      }
    };
  };

  var searchbar = function (query, debounce) {
    return m(".search-bar", [
      m("input.col-xs-11.col-md-8", {
        autofocus: "autofocus",
        placeholder: "Search ...",
        onchange: query,
        onkeyup: m.withAttr("value", debounce),
        value: query()
      }),
      m(".clearfix")
    ]);
  };

  var results = function (result, itemview) {
    return m(".search-results", result().map(function (res) {
      return m(".search-result.col-xs-12.col-sm-4.col-md-3.col-lg-2",
        itemview(res));
    }));
  };

})(window.bke = window.bke || {});
