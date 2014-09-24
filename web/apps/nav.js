var m = require('mithril');
var propShare = require('../lib/mithril/prop-share');

var nav = {};

nav.controller = function () {
  this.links = links;
  this.active = propShare("nav-main-active");
};

nav.view = function (ctrl) {
  return m("nav.el-navigation.js-movable", {
    class: ctrl.active() ? "active" : ""
  }, ctrl.links().map(navItem));
};

var navItem = function (item) {
  return m("a.menu-item", {
      href: '/#'+ item.url(),
      onclick: this.toggleMenu
    }, [insertIcon(item.icon), item.name()]);
};

var insertIcon = function (icon) {
  return icon ? m("i.fa.fa-"+icon()) : "";
};

var links = m.prop([
  {name: m.prop("Barkeep"), url: m.prop("/")},
  {name: m.prop("New bottle"), url: m.prop("/addbottle"), icon: m.prop("plus")},
  {name: m.prop("Pour drink"), url: m.prop("/pourdrink"), icon: m.prop("glass")},
  {name: m.prop("Your profile"), url: m.prop("/userprofile"), icon: m.prop("user")},
  {name: m.prop("Statistics"), url: m.prop("/stats"), icon: m.prop("bar-chart-o")}
]);

module.exports = nav;
