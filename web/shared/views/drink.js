(function (bke) {
  bke.views.drink = function (drink) {
    return m(".el-drink", [
      m(".drink-bottlename.col-xs-6", drink.bottle_name),
      m(".drink-price.col-xs-2", drink.price_nok),
      m(".drink-size.col-xs-2", drink.size_ml),
      m("a.drink-copy.col-xs-2", {
        href: "/pourdrink/"+drink.bottle_id+"/"+drink.size_ml,
        config: m.route
      }, "Copy"),
      m(".clearfix")
    ]);
  };
})(window.bke = window.bke || {});
