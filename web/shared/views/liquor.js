(function (bke) {
  bke.views.liquor = function (liquor) {
    console.log(liquor)
    return m(".el-liquor", {
      onclick: function () {
        m.route("/addbottle/"+ liquor._id);
      },
      style: liquor.images ? "background-image:url('"+liquor.images.large+"');" : ""
    },m(".liquor-info", [
      m(".liquor-name", liquor.name)
    ]));
  };
})(window.bke = window.bke || {});
