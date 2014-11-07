var m = require('mithril');

var bottle = function () {
  return m("a", {
    href: "addbottle",
    config: m.route,
    title: "Add a new bottle to the cabinet"
  }, m("i.fa.fa-plus.icon.icon--large"));
};

var drink = function () {
  return m("a", {
    href: "pourdrink",
    config: m.route,
    title: "Pour a drink from a bottle in the cabinet"
  }, [
    m("i.fa.fa-glass.icon.icon--large")
  ]);
};

module.exports = function (ctrl) {
  return m(".u-centered", [
    bottle(),
    drink()
  ]);
};
