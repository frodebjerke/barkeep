var m = require('mithril');

var share = {};

module.exports = function (key, val) {
  share.key = share.key || m.prop(val);

  return share.key;
};
