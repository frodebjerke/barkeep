(function (bke) {
  bke.views.liquor = function (liquor) {
    return m(".el-liquor", {
      onclick: function () {
        m.route("/addbottle/"+ liquor._id);
      },
      style: liquor.images ? "background-image:url('"+liquor.images.large+"');" : ""
    },m(".liquor-info", [
      m(".liquor-name", liquor.name),
      m(".liquor-type", liquor.category ? liquor.category.secondary : ""),
      m(".liquor-origin", liquor.about ? liquor.about.origin : "")
    ]));
  };
})(window.bke = window.bke || {});
