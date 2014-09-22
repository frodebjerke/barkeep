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
    return m("header.el-menu", {
      class: ctrl.active() ? "active" : ""
    },[
      m("button", {
        onclick: ctrl.toggleMenu
      }, m("i.fa.fa-bars"))
    ]);
  }
};
