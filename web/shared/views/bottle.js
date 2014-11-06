var m = require('mithril');

module.exports = function (bottle) {
  return m(".el-bottle", {
    onclick: function () {
      m.route('/pourdrink/'+bottle.id());
    },
    style: "background-image:url('"+ bottle.image() +"');"
  }, m(".bottle-info", [
    m(".bottle-name", bottle.name()),
    m(".bottle-owner", bottle.owner_name()),
    m(".bottle-size", [
      m(".bottle-amount", {
        style: "height:"+(bottle.volume_ml() / bottle.size_ml()) * 5+ "em;"
      }, new Number(bottle.volume_ml() / 1000).toPrecision(2))
    ])
  ]));
};
