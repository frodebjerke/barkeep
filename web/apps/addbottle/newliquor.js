(function (bke) {
  bke.addbottle.newliquor = {
    controller: function () {
      var basicinfo = basicinfomodel();
      var about = aboutmodel();

      return {
        basicinfo: basicinfo,
        about: about
      };
    },
    view: function (ctrl) {
      return m(".el-addliquor", [
          basicinfoview(ctrl.basicinfo),
          aboutview(ctrl.about)
      ]);
    }
  };

  var basicinfoview = function (basicinfo) {
    return m(".addliquor-basicinfo", [
      bke.views.input("Name", basicinfo().name)
    ]);
  };

  var aboutview = function (about) {
    return m(".addliquor-about", [
      m(".addliquor-subtitle", "Strategic information"),
      bke.views.input("Producer", about().producer),
      bke.views.input("Origin", about().origin)
    ]);
  };

  var basicinfomodel = function (model) {
    model = model || {};
    return m.prop({
      name: m.prop(model.name || "")
    });
  };

  var aboutmodel = function (model) {
    model = model || {};
    return m.prop({
      producer: m.prop(model.producer || ""),
      origin: m.prop(model.origin || "")
    });
  };

})(window.bke = window.bke || {});
