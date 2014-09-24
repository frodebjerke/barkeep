var m = require('mithril');

var share = {};

module.exports = function (key, val) {
  share.key = share.key || m.prop();

  if (val) share.key(val);

  return share.key;
};
