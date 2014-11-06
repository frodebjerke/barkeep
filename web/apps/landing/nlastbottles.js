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
    return m(".el-lastbottles", [
      m(".lastbottles-bottles", [
        m(".lastbottles-bottle.col-xs-12.col-sm-4.col-md-3.col-lg-2", [
          basicLinksView()
        ]),
        ctrl.bottles().map(function (bottle) {
          return [
            m(".lastbottles-bottle.col-xs-12.col-sm-4.col-md-3.col-lg-2", [
              bottleView(bottle)
            ])
          ];
        }),
        m(".clearfix")
      ])
    ]);
  }
};
