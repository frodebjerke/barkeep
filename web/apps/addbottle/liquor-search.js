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
        m("section", [
          m("h1", "Find and add bottle to cabinet")
        ]),
        searchbar(ctrl.query, ctrl.debounce),
        results(ctrl.result, itemview)
      ]);
    }
  };
};

var searchbar = function (query, debounce) {
  return m(".search-bar", [
    m("input", {
      autofocus: "autofocus",
      placeholder: "Search ...",
      onkeyup: m.withAttr("value", debounce),
      value: query()
    }),
    m(".clearfix")
  ]);
};

var results = function (result, itemview) {
  return m(".u-grid", result().map(function (res) {
    return m(".u-grid--box.col-xs-12.col-sm-6.col-md-4.col-lg-3",
      itemview(res));
  }));
};
