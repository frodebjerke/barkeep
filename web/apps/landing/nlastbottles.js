var m = require('mithril');
var bottleView = require('../../shared/views/bottle');
var Bottle = require('../../models/Bottle');

module.exports = {
  controller: function (n) {
    this.bottles = m.prop([]);
    Bottle.getAll({limit: n}).then(this.bottles);
  },
  view: function (ctrl) {
    return m(".u-grid", [
      ctrl.bottles().map(function (bottle) {
        return [
          m(".u-grid--box.col-xs-12.col-sm-6.col-md-4.col-lg-3", [
            bottleView(bottle)
          ])
        ];
      }),
      m(".clearfix")
    ]);
  }
};
