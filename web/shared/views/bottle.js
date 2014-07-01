(function (bke) {
  bke.views.bottle = function (bottle) {
    return m(".el-liquor.col-xs-12.col-sm-6.col-md-4.col-lg-3", {
      onclick: function () {
        m.route("/drink/"+ bottle.id);
      }
    },[
      m(".liquor-name.col-xs-10", bottle.name)
    ]);
  };
})(window.bke = window.bke || {});
