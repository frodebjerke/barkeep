var m = require('mithril');
var moment = require('moment');


m.dateprop = function (val) {
  var store = moment(val);
  var prop = function () {
    if (arguments.lenght) store = moment(val);
    return store;
  };

  prop.toJSON = function () {
    return store.toJSON();
  };

  prop.fromNow = function () {
    return store.fromNow();
  };

  return prop;
};
