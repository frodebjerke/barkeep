(function (bke) {
  var home = {
    controller: function () {
      return {
        lastdrinks: new bke.nlastdrinks.controller(4),
        lastbottles: new bke.nlastbottles.controller(18)
      };
    },
    view: function (ctrl) {
      return m("", [
        m(".el-top", [
          m(".top-title", "Barkeep"),
          m("a.top-addbottle", {
            href: "/addbottle",
            config: m.route
          }, "New bottle")
        ]),
        bke.nlastdrinks.view(ctrl.lastdrinks),
        bke.nlastbottles.view(ctrl.lastbottles),
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
