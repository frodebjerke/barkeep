(function (bke) {
  bke.views.bottle = function (bottle) {
    return m(".el-liquor", {
      onclick: function () {
        m.route("/pourdrink/"+ bottle.id);
      }
    },[
      //m(".bottle-name.col-xs-", {src: bottle.image_thumb}),
      m(".liquor-name.col-xs-7", bottle.name),
      m(".bottle-owner.col-xs-5", bottle.owner_name)
    ]);
  };
})(window.bke = window.bke || {});
