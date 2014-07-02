(function (bke) {
  var home = {
    controller: function () {

      return new bke.nlastdrinks.controller(2);
    },
    view: function (ctrl) {
      return m("", [
        m("h1", "BArK33p"),
        m("a.col-xs-12.col-md-6", {href: "/addbottle", config: m.route}, "Legg til"),
        m("a.col-xs-12.col-md-6", {href: "/drink", config: m.route}, "Konsumér"),
        bke.nlastdrinks.view(ctrl)
      ]);
    }
  };

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": home,
    "/addbottle": bke.liquorlist,
    "/addbottle/:id": bke.createBottle,
    "/drink": bke.bottlelist,
    "/drink/:bottle": bke.pourDrink,
    "/drink/:bottle/:amount": bke.pourDrink
  });
})(window.bke = window.bke || {});
