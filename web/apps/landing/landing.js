var m = require('mithril');
var personstats = require('./personstats');
var nlastdrinks = require('./nlastdrinks');
var nlastbottles = require('./nlastbottles');

module.exports = {
  controller: function () {
    return {
      personstats: new personstats.controller(),
      lastdrinks: new nlastdrinks.controller(3),
      lastbottles: new nlastbottles.controller(18)
    };
  },
  view: function (ctrl) {
    return m("", [
      nlastdrinks.view(ctrl.lastdrinks),
      personstats.view(ctrl.personstats),
      nlastbottles.view(ctrl.lastbottles),
    ]);
  }
};
