(function (bke) {
  var getDateString = function (dateraw) {
    var date = new Date(dateraw);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
    return interval + " mins";
    }
    return Math.floor(seconds) + " secs";
  };

  bke.views.drink = function (drink) {
    var poured = getDateString(drink.poured);
    return m("a.el-drink", {
      href: "/pourdrink/"+drink.bottle_id+"/"+drink.size_ml,
      config: m.route
    },[
      m(".drink-time", poured),
      m(".drink-user", drink.user_name),
      m(".drink-size", drink.size_ml),
      m(".drink-bottle", drink.bottle_name),
      m(".clearfix")
      // m(".drink-bottlename.col-xs-6", drink.bottle_name),
      // m(".drink-price.col-xs-2", drink.price_nok),
      // m(".drink-size.col-xs-2", drink.size_ml),
      // m("a.drink-copy.col-xs-2", {
      //   href: "/pourdrink/"+drink.bottle_id+"/"+drink.size_ml,
      //   config: m.route
      // }, "Copy"),
      // m(".clearfix")

    ]);
  };
})(window.bke = window.bke || {});
