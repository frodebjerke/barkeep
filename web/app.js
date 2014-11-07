require('./lib/mithril/dateprop-ext');
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
var economy = require('./apps/stats/economy');
var history = require('./apps/stats/history');
var profile = require('./apps/user/profile');

m.route.mode = "hash";
m.route(document.getElementById("barkeep-region"), "/", {
  "/": wrap(landing),
  "/addbottle": wrap(liquorlist),
  "/addbottle/new": wrap(newliquor),
  "/addbottle/:id": wrap(addBottle),
  "/pourdrink": wrap(bottlelist),
  "/pourdrink/:bottle": wrap(pourdrink),
  "/pourdrink/:bottle/:amount": wrap(pourdrink),
  "/economics": wrap(economy),
  "/history": wrap(history),
  "/user": wrap(profile),
  "/user/:id" : wrap(profile)
});

function wrap(module) {
  var content = mixinLayout(menu, module);

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
}
