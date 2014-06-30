(function () {

  var liquorview = function (liquor) {
    return m(".el-liquor.col-xs-12.col-sm-6.col-md-4.col-lg-3", {
      onclick: function () {
        m.route("/addbottle/"+ liquor.product_no);
      }
    },[
      m("img.col-xs-2", {src: liquor.image_thumb_url}),
      m(".liquor-name.col-xs-10", liquor.name)
    ]);
  };

  var liquorlist = {
    controller: function () {
      var query = m.prop("");
      var liquors = m.prop([]);

      var doQuery = function (term) {
        query(term);
        m.request({method: "GET", url: "/search/liquor/"+ query()}).then(liquors);
      };
      doQuery("vodka");
      return {
        result: liquors,
        query: query,
        doQuery: doQuery
      };
    },
    view: function (ctrl) {
      return m(".el-search", [
        m(".search-bar.row", [
          m("input", {onchange: m.withAttr("value", ctrl.doQuery), value: ctrl.query()})
        ]),
        m(".search-results", ctrl.result().map(liquorview))
      ]);
    }
  };

  var addbottle = {
    controller: function (liquorid) {
      liquorid = liquorid || m.route.param("id");
      var liquor = m.prop({});
      m.request({method: "GET", url: "/api/liquor/"+ liquorid}).then(liquor);
      var price = m.prop(300);
        var sacred = m.prop(false);
      var submit = function () {
        var xhrConfig = function(xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
        };
        m.request({method: "POST", url: "/api/bottles", config: xhrConfig, data: {
          liquor: liquor(),
          price: price(),
          sacred: sacred()
        }}).then(function () {
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
        liquorview(ctrl.data()),
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

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": liquorlist,
    "/addbottle": addbottle,
    "/addbottle/:id": addbottle
  });
})();
