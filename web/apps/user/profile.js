var m = require('mithril');
var _ = require('lodash');

var User = require('../../models/User');
var Bottle = require('../../models/Bottle');

var bottleView = require('../../shared/views/bottle');

module.exports = {
  controller: function () {
    var userid = m.route.param("bottle");
    this.user = m.prop({});
    this.bottles = m.prop([]);

    var userfetch = userid ? User.getById(userid) : User.getMe();
    userfetch
      .then(this.user)
      .then(Bottle.getAll)
      .then(function (bottles) {
        return filterUser(this.user().id(), bottles);
      }.bind(this))
      .then(this.bottles);
  },
  view: function (ctrl) {
    return m("", [
      m("section", [
        m("h1", [
          m("span", ctrl.user().name())
        ]),
        m(".u-grid-flex", [
          m(".u-grid-flex--box", m("img.image-profile", {src: ctrl.user().image()})),
          m(".u-grid-flex--box", [
            m(".text-title", "Cash balance"),
            m("", ctrl.user().balance() + ",-")
          ]),
          m(".u-grid-flex--box", [
            m(".text-title", "# bottles"),
            m("", ctrl.bottles().length)
          ])
        ]),
        ctrl.bottles().map(function (bottle) {
          return m(".u-grid--box.col-xs-12.col-sm-4.col-md-3.col-lg-2", bottleView(bottle));
        })
      ])
    ]);
  }
};

function filterUser(userid, bottles) {
  return _.filter(bottles, function (bottle) {
    return bottle.owner_id() === userid;
  });
}
