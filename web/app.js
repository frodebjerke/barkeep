var m = require('mithril');
var landing = require('./apps/landing/landing');
var liquorlist = require('./apps/addbottle/liquorlist');
var newliquor = require('./apps/addbottle/newliquor');
var addBottle = require('./apps/addbottle/addbottle');
var bottlelist = require('./apps/pourdrink/bottlelist');
var pourdrink = require('./apps/pourdrink/pourdrink');

m.route.mode = "hash";
m.route(document.getElementById("barkeep-region"), "/", {
  "/": landing,
  "/addbottle": liquorlist,
  "/addbottle/newliquor": newliquor,
  "/addbottle/:id": addBottle,
  "/pourdrink": bottlelist,
  "/pourdrink/:bottle": pourdrink,
  "/pourdrink/:bottle/:amount": pourdrink
});
