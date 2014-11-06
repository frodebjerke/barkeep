var m = require('mithril');
var bottleView = require('../../shared/views/bottle');
var Bottle = require('../../models/Bottle');
var basicLinksView = require('./basic-links-view');

module.exports = {
  controller: function (n) {
    this.bottles = m.prop([]);
    Bottle.getAll({limit: n}).then(this.bottles);
  },
  view: function (ctrl) {
    return m(".u-grid", [
      m(".u-grid--box.col-xs-12.col-sm-4.col-md-3.col-lg-2", [
        basicLinksView()
      ]),
      ctrl.bottles().map(function (bottle) {
        return [
          m(".u-grid--box.col-xs-12.col-sm-4.col-md-3.col-lg-2", [
            bottleView(bottle)
          ])
        ];
      }),
      m(".clearfix")
    ]);
  }
};
