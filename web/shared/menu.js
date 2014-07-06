(function (bke) {
  bke.menu = {
    controller: function () {

    },
    view: function (ctrl) {
      return m(".el-menu", [
        m("a.menu-icon", "m")
      ]);
    }
  };
})(window.bke = window.bke || {});
