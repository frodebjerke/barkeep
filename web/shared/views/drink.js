(function (bke) {
  bke.views.drink = function (drink) {
    return m(".el-drink", [
      m(".drink-bottlename.col-xs-8", drink.bottle_name),
      m(".drink-size.col-xs-2", drink.price_nok),
      m(".drink-size.col-xs-2", drink.size_ml)
    ]);
  };
})(window.bke = window.bke || {});
