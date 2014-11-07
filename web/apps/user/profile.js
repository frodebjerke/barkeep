var m = require('mithril');

var User = require('../../models/User');

module.exports = {
  controller: function () {
    var userid = m.route.param("bottle");
    this.user = m.prop({});

    var userfetch = userid ? User.getById(userid) : User.getMe();
    userfetch.then(this.user);
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
          ])
        ])
      ])
    ]);
  }
};
