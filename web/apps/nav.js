var m = require('mithril');
var _ = require('lodash');
var propShare = require('../lib/mithril/prop-share');

module.exports = {
  controller: function () {
    this.links = links;
    this.active = propShare("nav-main-active");
  },
  view: function (ctrl) {
    return m("nav.el-navigation.js-movable.u-grid-flex", {
      class: ctrl.active() ? "active" : ""
    }, ctrl.links().map(navItem(ctrl.active)));
  }
};

var navItem = _.curry(function (active, item) {
  return m("a.u-grid-flex--box.u-icon.large", {
      onclick: active.bind(null, false),
      href: item.url(),
      config: m.route,
      title: item.name()
    }, insertIcon(item.icon));
});

var insertIcon = function (icon) {
  return icon ? m("i.fa.fa-"+icon()) : "";
};

var links = m.prop([
  {name: m.prop("Barkeep"), url: m.prop("/"), icon: m.prop("barcode")},
  {name: m.prop("New bottle"), url: m.prop("/addbottle"), icon: m.prop("plus")},
  {name: m.prop("Your profile"), url: m.prop("/user"), icon: m.prop("user")},
  {name: m.prop("Economics"), url: m.prop("/economics"), icon: m.prop("dollar")},
  {name: m.prop("History"), url: m.prop("/history"), icon: m.prop("history")}
]);
