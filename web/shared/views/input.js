var m = require('mithril');

module.exports = function (label, prop, type) {
  return m("",[
    m("label", label),
    m("input", {
      onchange: m.withAttr("value", prop),
      type: type || typeof(prop()),
      value: prop()
    }),
    m(".clearfix")
  ]);
};
