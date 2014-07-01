(function (bke) {
  bke.views.liquor = function (liquor) {
    return m(".el-liquor.col-xs-12.col-sm-6.col-md-4.col-lg-3", {
      onclick: function () {
        m.route("/addbottle/"+ liquor.product_no);
      }
    },[
      m("img.col-xs-2", {src: liquor.image_thumb_url}),
      m(".liquor-name.col-xs-10", liquor.name)
    ]);
  };
})(window.bke = window.bke || {});
