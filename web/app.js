(function (bke) {
  var home = {
    controller: function () {
      return {

      };
    },
    view: function (ctrl) {
      return m("", [
        m("h1", "BArK33p"),
        m("a", {href: "/addbottle", config: m.route}, "Legg til"),
        m("a", {href: "/drink", config: m.route}, "Konsumér")
      ]);
    }
  };

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": home,
    "/addbottle": bke.liquorlist,
    "/addbottle/:id": bke.createBottle,
    "/drink": bke.bottlelist,
    "/drink/:id": bke.pourDrink
  });
})(window.bke = window.bke || {});
