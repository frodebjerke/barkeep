var m = require('mithril');

module.exports = function (bottle) {
  return m(".el-item", {
    onclick: function () {
      m.route('/pourdrink/'+bottle.id());
    },
    style: "background-image:url('"+ bottle.image() +"');"
  }, m(".item-info", [
    m(".text-title", bottle.name()),
    m(".text-subtitle", bottle.owner_name()),
    m(".el-bottle-size", [
      m(".bottle-amount", {
        style: "height:"+(bottle.volume_ml() / bottle.size_ml()) * 5+ "em;"
      }, Number(bottle.volume_ml() / 1000).toPrecision(2))
    ])
  ]));
};
