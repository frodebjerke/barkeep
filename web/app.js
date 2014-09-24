var m = require('mithril');
var mixinLayout = require('./lib/mithril/mixin-layout');
var menu = require('./apps/menu');
var landing = require('./apps/landing/landing');
var liquorlist = require('./apps/addbottle/liquorlist');
var newliquor = require('./apps/addbottle/newliquor');
var addBottle = require('./apps/addbottle/addbottle');
var bottlelist = require('./apps/pourdrink/bottlelist');
var pourdrink = require('./apps/pourdrink/pourdrink');
var nav = require('./apps/nav');

var wrap = function () {
  var content = mixinLayout(menu, landing);

  return {
    controller: function () {
      this.nav = new nav.controller();
      this.content = new content.controller();
    },
    view: function (ctrl) {
      return [
        nav.view(ctrl.nav),
        m(".js-page-canvas.js-movable", content.view(ctrl.content))
      ];
    }
  };
};

m.route.mode = "hash";
m.route(document.getElementById("barkeep-region"), "/", {
  "/": wrap(menu, landing),
  "/addbottle": liquorlist,
  "/addbottle/new": newliquor,
  "/addbottle/:id": addBottle,
  "/pourdrink": bottlelist,
  "/pourdrink/:bottle": pourdrink,
  "/pourdrink/:bottle/:amount": pourdrink
});
