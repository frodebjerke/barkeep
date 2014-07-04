(function (bke) {
  var home = {
    controller: function () {
      return {
        lastdrinks: new bke.nlastdrinks.controller(4),
        lastbottles: new bke.nlastbottles.controller(4)
      };
    },
    view: function (ctrl) {
      return m("", [
        m("h1", "Barkeep"),
        m("a.col-xs-12.col-md-6", {href: "/addbottle", config: m.route}, "Legg til"),
        m("a.col-xs-12.col-md-6", {href: "/pourdrink", config: m.route}, "Konsumér"),
        bke.nlastdrinks.view(ctrl.lastdrinks),
        bke.nlastbottles.view(ctrl.lastbottles)
      ]);
    }
  };

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": home,
    "/addbottle": bke.liquorlist,
    "/addbottle/:id": bke.createBottle,
    "/pourdrink": bke.bottlelist,
    "/pourdrink/:bottle": bke.pourDrink,
    "/pourdrink/:bottle/:amount": bke.pourDrink
  });
})(window.bke = window.bke || {});
