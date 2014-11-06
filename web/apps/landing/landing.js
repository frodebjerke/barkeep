var m = require('mithril');
var nlastbottles = require('./nlastbottles');
var drinkorbottle = require('./drinkorbottle');

module.exports = {
  controller: function () {
    return {
      lastbottles: new nlastbottles.controller(18),
      drinkorbottle: new drinkorbottle.controller()
    };
  },
  view: function (ctrl) {
    return m("", [
      drinkorbottle.view(ctrl.drinkorbottle),
      nlastbottles.view(ctrl.lastbottles)
    ]);
  }
};
