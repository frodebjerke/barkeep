(function (bke) {
  bke.views.datalist = function (id, prop, list) {
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

})(window.bke = window.bke || {});
