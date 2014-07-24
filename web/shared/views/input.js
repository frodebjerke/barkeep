(function (bke) {
  bke.views.input = function (label, prop, type) {
    return m("",[
      m("label", label),
      m("input", {
        onchange: m.withAttr("value", prop),
        type: type || typeof(prop()),
        value: prop()
      })
    ]);
  };

})(window.bke = window.bke || {});
