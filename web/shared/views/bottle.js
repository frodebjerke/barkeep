(function (bke) {
  bke.views.bottle = function (bottle) {
    return m(".el-bottle", {
      onclick: function () {
        m.route(/pourdrink/+bottle.product_id);
      },
      style: "background-image:url('"+ bottle.image +"');"
    }, m(".bottle-info", [
      m(".bottle-name", bottle.name),
      m(".bottle-owner", bottle.owner_name)
    ]));
  };
})(window.bke = window.bke || {});
