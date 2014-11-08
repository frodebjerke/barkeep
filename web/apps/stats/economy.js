var m = require('mithril');
var _ = require('lodash');
var User = require('../../models/User');

module.exports = {
  controller: function () {
    this.users = m.prop([]);
    this.totals = m.prop({});
    var orderByBalanceDesc = _.partialRight(_.sortBy, function (user) { return user.balance(); });
    User.getAll()
      .then(orderByBalanceDesc)
      .then(this.users)
      .then(calcTotals)
      .then(this.totals);
  },
  view: function (ctrl) {
    return m("", [
      m("", ctrl.users().map(userTab)),
      overview(ctrl.totals)
    ]);
  }
};

function userTab(user) {
  return m(".u-line", [
    m("img.image-profile", {src: user.image()}),
    m("", user.name()),
    m("", user.balance() + ",-")
  ]);
}

function overview(totals) {
    return m("section", [
      m("h1", "Overview"),
      m(".u-grid-flex", [
        m(".u-grid-flex--box", [
          m(".text-title", "Total value"),
          m("", totals().totalValue() + ",-")
        ])
      ])
    ]);
}

function calcTotals(users) {
  var l =  {
    totalValue: m.prop(_.reduce(users, function (sum, user) {
      return sum + user.balance();
    }, 0))
  };
  return l;
}
