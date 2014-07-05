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
        m(".lastdrinks-ctrls", [
          m(".lastdrinks-title", "Siste drinker"),
          m("a.lastdrinks-pourdrink", {
            href: "/pourdrink",
            config: m.route
          }, "Konsumér")
        ]),
        drinks().map(function (drink) {
          return bke.views.drink(drink);
        })
      ]);
    }
  };
})(window.bke = window.bke || {});
