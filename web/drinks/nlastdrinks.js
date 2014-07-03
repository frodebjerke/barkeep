(function (bke) {
  bke.nlastdrinks = {
    controller: function (n) {
      var drinks = m.prop([]);
      m.request({
        method: "GET",
        url: "/api/drinks",
        data: {
          limit: n
        }
      }).then(drinks);

      return drinks;
    },
    view: function (drinks) {
      return m(".el-lastdrinks", [
        m(".lastdrinks", "Siste drinker"),
        drinks().map(function (drink) {
          return [
            m(".lastdrinks-drink.col-xs-10", [
              bke.views.drink(drink),
            ]),
            m("a.lastdrinks-copy.col-xs-2", {
                href: "/pourdrink/"+drink.bottle_id,
                config: m.route
              }, "Copy")
          ];
        })
      ]);
    }
  };
})(window.bke = window.bke || {});
