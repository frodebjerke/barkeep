var m = require('mithril');
var Bottle = require('../../models/Bottle');
var Drink = require('../../models/Drink');
var bottleView = require('../../shared/views/bottle');

module.exports = {
  controller: function (bottleid) {
    bottleid = bottleid || m.route.param("bottle");

    this.bottle = m.prop({});
    this.amount = m.prop(m.route.param("amount") || 40);

    this.submit = function () {
      Drink.create(this.bottle(), this.amount()).then(m.route.bind(null, "/"));
    }.bind(this);

    Bottle.getById(bottleid).then(this.bottle);
  },
  view: function (ctrl) {
    return m(".el-pourdrink", [
      m(".pourdrink-bottle", bottleView(ctrl.bottle())),
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
