var m = require('mithril');
var personstats = require('./personstats');
var nlastdrinks = require('./nlastdrinks');
var nlastbottles = require('./nlastbottles');
var drinkorbottle = require('./drinkorbottle');

module.exports = {
  controller: function () {
    return {
      personstats: new personstats.controller(),
      lastdrinks: new nlastdrinks.controller(3),
      lastbottles: new nlastbottles.controller(18),
      drinkorbottle: new drinkorbottle.controller()
    };
  },
  view: function (ctrl) {
    return m("", [
      drinkorbottle.view(ctrl.drinkorbottle),
      personstats.view(ctrl.personstats),
      nlastbottles.view(ctrl.lastbottles),
    ]);
  }
};
