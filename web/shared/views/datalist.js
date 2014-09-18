var m = require('mithril');

module.exports = function (id, prop, list) {
    return [
      m("label", id),
      m("input", {
        list: id,
        onchange: m.withAttr("value", prop),
        value: prop()
      }),
      m("datalist", {
        id: id
      }, list().map(function (elem) {
        return m("option", {
          value: elem
        });
      }))
    ];
  };
