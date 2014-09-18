var m = require('mithril');
var bottleView = require('../../shared/views/bottle');

module.exports = {
  controller: function (bottleid) {
    bottleid = bottleid || m.route.param("bottle");
    var amount = m.prop(m.route.param("amount") || 40);
    var bottle = fetchBottle(bottleid);

    var submit = function () {
      var data = {
        bottle: bottle(),
        amount: amount()
      };
      postDrink(data).then(function () {
        m.route("/");
      });
    };

    return {
      data: bottle,
      amount: amount,
      submit: submit
    };
  },
  view: function (ctrl) {
    return m(".el-pourdrink", [
      m(".pourdrink-bottle", bottleView(ctrl.data())),
      amount(ctrl.amount),
      submit(ctrl.submit)
    ]);
  }
};

var amount = function (amount) {
  return m(".pourdrink-amount", [
    m("label", "How much (ml) ?"),
    m("input", {
      onchange: m.withAttr("value", amount),
      value: amount()
    })
  ]);
};

var submit = function (submit) {
  return m(".pourdrink-submit", [
    m("button", {onclick: submit}, "Submit")
  ]);
};

var fetchBottle = function (id) {
  var bottle = m.prop({});

  m.request({
    method: "GET",
    url: "/api/bottles/"+id
  }).then(bottle);

  return bottle;
};

var postDrink = function (data) {
  var xhrConfig = function (xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
  };
  return m.request({
    method: "POST",
    url: "/api/drinks",
    config: xhrConfig,
    data: data
  });
};
