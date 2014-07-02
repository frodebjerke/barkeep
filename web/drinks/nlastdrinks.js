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
      return m("div", drinks().map(function (drink) {
        return [
          m(".col-xs-11", [
            bke.views.drink(drink),
          ]),
          m("a.col-xs-1", {href: "/pourdrink/"+drink.bottle_id}, "Copy")
        ];
      }));
    }
  };
})(window.bke = window.bke || {});
