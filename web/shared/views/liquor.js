var m = require('mithril');

module.exports = function (liquor) {
  return m(".el-item", {
    onclick: function () {
      m.route("/addbottle/"+ liquor._id());
    },
    style: liquor.images() ? "background-image:url('"+liquor.images().large+"');" : ""
  },m(".item-info", [
    m(".text-title", liquor.name()),
    m(".text-subtitle", liquor.category() ? liquor.category().secondary : ""),
    m(".text-subtitle", liquor.about() ? liquor.about().origin : "")
  ]));
};
