var m = require('mithril');

module.exports = function () {
  var modules = Array.prototype.slice.call(arguments); // make arguments a real array
  return {
    controller: function () {
      return modules.map(function (module) {
        return new module.controller();
      });
    },
    view: function (ctrls) {
      return modules.map(function (module, i) {
        return module.view(ctrls[i]);
      });
    }
  };
};
