var m = require('mithril');
var nlastbottles = require('./nlastbottles');

module.exports = {
  controller: function () {
    return {
      lastbottles: new nlastbottles.controller(18),
    };
  },
  view: function (ctrl) {
    return m("", [
      nlastbottles.view(ctrl.lastbottles)
    ]);
  }
};
