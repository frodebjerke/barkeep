(function (bke) {
  bke.views.liquor = function (liquor) {
    return m(".el-liquor", {
      onclick: function () {
        m.route("/addbottle/"+ liquor._id);
      },
      style: "background-image:url('"+liquor.images.external+"');"
    },m(".liquor-info", [
      m(".liquor-name", liquor.name)
    ]));
  };
})(window.bke = window.bke || {});
