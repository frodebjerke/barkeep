var m = require('mithril');

var controller = function () {

};

var bottle = function () {
  return m("a", {
    href: "addbottle",
    config: m.route,
    title: "Add a new bottle to the cabinet"
  }, m("i.fa.fa-plus"));
};

var drink = function () {
  return m("a", {
    href: "pourdrink",
    config: m.route,
    title: "Pour a drink from a bottle in the cabinet"
  }, [
    m("i.fa.fa-glass")
  ]);
};

var view = function (ctrl) {
  return m(".el-drinkorbottle", [
    bottle(),
    drink()
  ]);
};

module.exports = {
  controller: controller,
  view: view
};
