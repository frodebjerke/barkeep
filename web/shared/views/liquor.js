(function (bke) {
  bke.views.liquor = function (liquor) {
    return m(".el-liquor", {
      onclick: function () {
        m.route("/addbottle/"+ liquor.product_no);
      },
      style: "background-image:url('"+liquor.image_url+"');"
    },m(".liquor-info", [
      m(".liquor-name", liquor.name)
    ]));
  };
})(window.bke = window.bke || {});
