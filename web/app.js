(function (bke) {
  var home = {
    controller: function () {
      return {

      };
    },
    view: function (ctrl) {
      return m("", [
        m("h1", "BArK33p"),
        m("a", {href:"/addbottle", config: m.route}, "Legg til")
      ]);
    }
  };

  m.route(document.getElementById("barkeep-region"), "/", {
    "/": home,
    "/addbottle": bke.liquorlist,
    "/addbottle/:id": bke.createBottle
  });
})(window.bke = window.bke || {});
