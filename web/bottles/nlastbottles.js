(function (bke) {
  bke.nlastbottles = {
    controller: function (n) {
      var bottles = m.prop([]);
      m.request({
        method: "GET",
        url: "/api/bottles",
        data: {
          limit: n
        }
      }).then(bottles);

      return bottles;
    },
    view: function (bottles) {
      return m(".el-lastbottles", [
        m(".lastbottles", "Siste flasker"),
        bottles().map(function (bottle) {
          return [
            m(".lastbottles-bottle.col-xs-6.col-sm-4.col-md-3.col-lg-2", [
              bke.views.bottle(bottle),
            ])
          ];
        })
      ]);
    }
  };
})(window.bke = window.bke || {});
