(function (bke) {
  bke.nlastbottles = {
    controller: function (n) {
      var bottles = m.prop([]);
      var stats = m.prop({
        inCabinet: m.prop("n/a"),
        emptied: m.prop("n/a"),
        avgLifetime: m.prop("n/a")
      });

      m.request({
        method: "GET",
        url: "/api/bottles",
        data: {
          limit: n
        }
      }).then(bottles).then(function () {
        stats().inCabinet(bottles().length);
      });
      return {
        bottles: bottles,
        stats: stats
      };
    },
    view: function (ctrl) {
      return m(".el-lastbottles", [
        m(".lastbottles-bottles", [
          m(".lastbottles-bottle.col-xs-6.col-sm-4.col-md-3.col-lg-2", [
            bottleinfo()
          ]),
          ctrl.bottles().map(function (bottle) {
            return [
              m(".lastbottles-bottle.col-xs-6.col-sm-4.col-md-3.col-lg-2", [
                bke.views.bottle(bottle)
              ])
            ];
          }),
          m(".lastbottles-bottle.col-xs-6.col-sm-4.col-md-3.col-lg-2", [
            bottlestats(ctrl.stats())
          ]),
          m(".clearfix")
        ])
      ]);
    }
  };

  var bottleinfo = function () {
    return m(".el-bottleinfo", [
      m("h2.bottleinfo-title", "Bottles in the cabinet:")
    ]);
  };

  var bottlestats = function (stats) {
    return m(".el-bottleinfo", [
      // m(".bottleinfo-label", "central bottle stats"),
      m(".bottleinfo-stat", [
        m("h3.bottleinfo-value", stats.inCabinet()),
        m(".bottleinfo-key", "in cabinet")
      ]),
      m(".bottleinfo-stat", [
        m("h3.bottleinfo-value", stats.emptied()),
        m(".bottleinfo-key",  "emptied")
      ]),
      m(".bottleinfo-stat", [
        m("h3.bottleinfo-value", stats.avgLifetime()),
        m(".bottleinfo-key", "average lifetime in days")
      ])
    ]);
  };
})(window.bke = window.bke || {});
