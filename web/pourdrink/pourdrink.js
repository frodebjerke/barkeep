(function (bke) {
  bke.pourDrink = {
    controller: function (bottleid) {
      bottleid = bottleid || m.route.param("bottle");
      var amount = m.prop(m.route.param("amount") || 40);
      var bottle = m.prop({});

      m.request({
        method: "GET",
        url: "/api/bottles/"+bottleid
      }).then(bottle);

      var submit = function () {
        var xhrConfig = function (xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
        };
        m.request({
          method: "POST",
          url: "/api/drinks",
          config: xhrConfig,
          data: {
            bottle: bottle(),
            amount: amount()
          }
        }).then(function () {
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
        bke.views.bottle(ctrl.data()),
        m(".pourdrink-amount", [
          m("label", "How much (ml) ?"),
          m("input", {
            onchange: m.withAttr("value", ctrl.amount),
            value: ctrl.amount()
          }),
          m(".pourdrink-submit", [
            m("button", {onclick: ctrl.submit}, "Submit")
          ])
        ])
      ]);
    }
  };
})(window.bke = window.bke || {});
