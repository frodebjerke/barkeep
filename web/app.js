(function (bke) {
  m.route.mode = "hash";
  m.startComputation();
  m.module(document.getElementById("menu-region"), bke.modules.menu);
  m.route(document.getElementById("barkeep-region"), "/", {
    "/": bke.landing.landing,
    "/addbottle": bke.addbottle.liquorlist,
    "/addbottle/:id": bke.addbottle.addBottle,
    "/pourdrink": bke.pourdrink.bottlelist,
    "/pourdrink/:bottle": bke.pourdrink.pourDrink,
    "/pourdrink/:bottle/:amount": bke.pourdrink.pourDrink
  });
  m.endComputation();

})(window.bke = window.bke || {});
