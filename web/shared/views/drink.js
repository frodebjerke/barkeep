(function (bke) {
  var getDateString = function (dateraw) {
    var date = new Date(dateraw);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
    return interval + " mins ago";
    }
    return Math.floor(seconds) + " secs ago";
  };

  bke.views.drink = function (drink) {
    var poured = getDateString(drink.poured);
    return m("a.el-drink", {
      href: "/pourdrink/"+drink.bottle_id+"/"+drink.size_ml,
      config: m.route
    },[
      m(".drink-time.col-xs-12.col-md-2.col-lg-1", poured),
      m(".col-xs-12.col-md-10.col-lg-11", [
        m("span.drink-user", drink.user_name),
        m("span.drink-size", drink.size_ml),
        m("span.drink-bottle", drink.bottle_name)
      ])
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
