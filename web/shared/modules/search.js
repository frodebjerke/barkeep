var m = require('mithril');

module.exports = function (itemview, doQuery) {
  return {
    controller: function () {
      var ctrl = this;
      this.query = m.prop("");
      this.result = m.prop([]);
      var timer;

      doQuery(this.query, this.result);

      this.debounce = function (term) {
          ctrl.query(term);
          timer && clearTimeout(timer);
          timer = setTimeout(function () {
            doQuery(ctrl.query, ctrl.result);
          }, 300);
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
