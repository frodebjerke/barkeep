var m = require('mithril');
var _ = require('lodash');
var User = require('../../models/User');

module.exports = {
  controller: function () {
    this.users = m.prop([]);
    var orderByBalanceDesc = _.partialRight(_.sortBy, function (user) { return user.balance(); });
    User.getAll().then(orderByBalanceDesc).then(this.users);
  },
  view: function (ctrl) {
    return m(".c-economy", [
      ctrl.users().map(userTab)
    ]);
  }
};

function userTab(user) {
  return m(".economy-tab", [
    m("span", user.name() + "'s tab is " + user.balance() + ",-")
  ]);
}
