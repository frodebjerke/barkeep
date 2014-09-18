var m = require('mithril');

module.exports = {
  controller: function (userid) {
    userid = userid || m.route.param("userid");
    var user = m.prop({});
    m.request({
      method: "GET",
      url: "/api/me"
    }).then(user);

    return {
      user: user
    };
  },
  view: function (ctrl) {
    var balance = ctrl.user().balance;
    var posneg = "";
    if (balance > 0) posneg = "positive";
    else if (balance < 0) posneg = "negative";

    return m(".el-person", [
      m("h3.person-balance", {
        class: posneg
      }, ctrl.user().balance)
    ]);
  }
};
