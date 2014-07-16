(function (bke) {
  var home = {
    controller: function () {
      return {
        personstats: new bke.personstats.controller(),
        lastdrinks: new bke.nlastdrinks.controller(3),
        lastbottles: new bke.nlastbottles.controller(18)
      };
    },
    view: function (ctrl) {
      return m("", [
        bke.nlastdrinks.view(ctrl.lastdrinks),
        bke.personstats.view(ctrl.personstats),
        bke.nlastbottles.view(ctrl.lastbottles),
      ]);
    }
  };

  m.startComputation();

  m.module(document.getElementById("menu-region"), bke.menu);
  m.route(document.getElementById("barkeep-region"), "/", {
    "/": home,
    "/addbottle": bke.liquorlist,
    "/addbottle/:id": bke.createBottle,
    "/pourdrink": bke.bottlelist,
    "/pourdrink/:bottle": bke.pourDrink,
    "/pourdrink/:bottle/:amount": bke.pourDrink
  });
  m.endComputation();

})(window.bke = window.bke || {});
