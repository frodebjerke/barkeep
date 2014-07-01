(function (bke) {
  bke.views.bottle = function (bottle) {
    return m(".el-liquor.col-xs-12.col-sm-6.col-md-4.col-lg-3", {
      onclick: function () {
        m.route("/drink/"+ bottle.id);
      }
    },[
      m(".bottle-name.col-xs-2", {src: bottle.image_thumb}),
      m(".liquor-name.col-xs-5", bottle.name),
      m(".bottle-owner.col-xs-5", bottle.owner_name)
    ]);
  };
})(window.bke = window.bke || {});
