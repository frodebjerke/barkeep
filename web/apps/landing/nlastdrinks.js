var m = require('mithril');
var drinkView = require('../../shared/views/drink');

module.exports = {
    controller: function (n) {
      var drinks = m.prop([]);
      m.request({
        method: "GET",
        url: "/api/drinks",
        data: {
          limit: n
        }
      }).then(drinks);

      return drinks;
    },
    view: function (drinks) {
      return m(".el-lastdrinks", [
        m(".lastdrinks-title", "Most recently poured drinks ..."),
        drinks().map(function (drink) {
          return drinkView(drink);
        })
      ]);
    }
  };
