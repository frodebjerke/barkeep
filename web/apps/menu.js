var m = require('mithril');
var propShare = require('../lib/mithril/prop-share');

module.exports = {
  controller: function () {
    var ctrl = this;
    ctrl.active = propShare("nav-main-active", false);
    ctrl.toggleMenu =  function () {
      ctrl.active(!ctrl.active());
    };
  },
  view: function (ctrl) {
    return m("header.el-menu.u-line", {
      class: ctrl.active() ? "active" : ""
    },[
      m("button.u-icon", {
        onclick: ctrl.toggleMenu
      }, m("i.fa.fa-bars")),
      bottle()
    ]);
  }
};


var bottle = function () {
  return m("a.u-icon", {
    href: "addbottle",
    config: m.route,
    title: "Add a new bottle to the cabinet"
  }, [
    m("i.fa.fa-plus"),
  ]);
};
