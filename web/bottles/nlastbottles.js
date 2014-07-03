(function (bke) {
  bke.nlastbottles = {
    controller: function (n) {
      var bottles = m.prop([]);
      m.request({
        method: "GET",
        url: "/api/bottles",
        data: {
          limit: n
        }
      }).then(bottles);

      return bottles;
    },
    view: function (bottles) {
      return m(".el-lastbottles", [
        m(".lastbottles", "Siste flasker"),
        bottles().map(function (bottle) {
          return [
            m(".lastbottles-bottle.col-xs-10", [
              bke.views.bottle(bottle),
            ]),
            m("a.lastbottles-pour.col-xs-2", {
                href: "/pourdrink/"+bottle.product_id,
                config: m.route
              }, "Pour")
          ];
        })
      ]);
    }
  };
})(window.bke = window.bke || {});
