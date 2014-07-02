(function (bke) {
  bke.views.drink = function (drink) {
    return m(".el-drink", [
      m(".drink-bottlename.col-xs-6", drink.bottle_name),
      m(".drink-size.col-xs-3", drink.price),
      m(".drink-size.col-xs-3", drink.size_ml)
    ]);
  };
})(window.bke = window.bke || {});
