(function (bke) {
  bke.createBottle = {
    controller: function (liquorid) {
      liquorid = liquorid || m.route.param("id");
      var liquor = m.prop({});

      m.request({
        method: "GET",
        url: "/api/liquor/"+ liquorid
      }).then(liquor);

      var price = m.prop(300);
      var sacred = m.prop(false);

      var submit = function () {
        var xhrConfig = function(xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
        };
        m.request({
          method: "POST",
          url: "/api/bottles",
          config: xhrConfig,
          data: {
            liquor: liquor(),
            price: price(),
            sacred: sacred()
          }
        }).then(function () {
          m.route("/");
        });
      };
      return {
        data: liquor,
        price: price,
        sacred: sacred,
        submit: submit
      };
    },
    view: function (ctrl) {
      return m(".el-addbottle", [
        bke.views.liquor(ctrl.data()),
        m(".addbottle-price",[
          m("label", "Price"),
          m("input", {onchange: m.withAttr("value", ctrl.price), value: ctrl.price()})
        ]),
        m(".addbottle-sacred", [
          m("label", "Is this bottle totally sacred to you?"),
          m("input", {type: "checkbox", value: ctrl.sacred(), onchange: m.withAttr("value", ctrl.sacred)})
        ]),
        m(".addbottle-submit", [
          m("button", {onclick: ctrl.submit}, "Submit")
        ])
      ]);
    }
  };
})(window.bke = window.bke || {});
