(function (bke) {
  bke.addbottle.newliquor = {
    controller: function () {
      var basicinfo = basicinfomodel();
      var about = aboutmodel();
      var images = imagesmodel();

      return {
        basicinfo: basicinfo,
        about: about,
        images: images
      };
    },
    view: function (ctrl) {
      return m(".el-addliquor", [
          basicinfoview(ctrl.basicinfo),
          aboutview(ctrl.about),
          imagesview(ctrl.images)
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
      subtitle("Strategic information"),
      bke.views.input("Producer", about().producer),
      bke.views.input("Origin", about().origin)
    ]);
  };

  var imagesview = function (images) {
    return m(".addliquor-images", [
      subtitle("Imagery"),
      bke.views.input("Large", images().external),
      bke.views.input("Thumb", images().external_thumb)
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

  var imagesmodel = function (model) {
    model = model || {};
    return m.prop({
      external: m.prop(model.external || ""),
      external_thumb: m.prop(model.external_thumb || "")
    });
  };

  var subtitle = function (text) {
    return m(".addliquor-subtitle", text);
  };

})(window.bke = window.bke || {});
