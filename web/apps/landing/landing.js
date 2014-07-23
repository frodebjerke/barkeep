(function (bke) {
  bke.landing.landing = {
    controller: function () {
      return {
        personstats: new bke.landing.personstats.controller(),
        lastdrinks: new bke.landing.nlastdrinks.controller(3),
        lastbottles: new bke.landing.nlastbottles.controller(18)
      };
    },
    view: function (ctrl) {
      return m("", [
        bke.landing.nlastdrinks.view(ctrl.lastdrinks),
        bke.landing.personstats.view(ctrl.personstats),
        bke.landing.nlastbottles.view(ctrl.lastbottles),
      ]);
    }
  };
})(window.bke = window.bke || {});
