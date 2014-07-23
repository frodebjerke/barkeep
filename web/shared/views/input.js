(function (bke) {
  bke.views.input = function (label, prop) {
    return m("",[
      m("label", label),
      m("input", {
        onchange: m.withAttr("value", prop),
        value: prop()
      })
    ]);
  };

})(window.bke = window.bke || {});
