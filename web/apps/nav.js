var m = require('mithril');
var propShare = require('../lib/mithril/prop-share');

var nav = {};

nav.controller = function () {
  this.links = links;
  this.active = propShare("nav-main-active");
};

nav.view = function (ctrl) {
  return m("nav.el-navigation", {
    class: ctrl.active() ? "active" : ""
  }, ctrl.links().map(navItem));
};

var navItem = function (item) {
  return m("a.menu-item", {
      href: '/#'+ item.url(),
      onclick: this.toggleMenu
    }, item.name());
};

var links = m.prop([
  {name: m.prop("Barkeep"), url: m.prop("/")},
  {name: m.prop("New bottle"), url: m.prop("/addbottle")},
  {name: m.prop("Pour drink"), url: m.prop("/pourdrink")},
  {name: m.prop("Your profile"), url: m.prop("/userprofile")},
  {name: m.prop("Statistics"), url: m.prop("/stats")}
]);

module.exports = nav;
