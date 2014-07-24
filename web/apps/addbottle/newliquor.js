(function (bke) {
  bke.addbottle.newliquor = {
    controller: function () {
      var liquormodel = {
        basicinfo: basicinfomodel(),
        about: aboutmodel(),
        images: imagesmodel(),
        category: categorymodel(),
        packaging: packagingmodel(),
        prices: pricemodel(),
        notes: notesmodel(),
        contents: contentsmodel(),
      };
      liquormodel.submit = function () {
        postLiquor(liquormodel).then(function () {
          m.route("/");
        });
      };

      return liquormodel;
    },
    view: function (ctrl) {
      return m(".el-newliquor", [
          basicinfoview(ctrl.basicinfo),
          aboutview(ctrl.about),
          imagesview(ctrl.images),
          categoryview(ctrl.category),
          packagingview(ctrl.packaging),
          priceview(ctrl.prices),
          notesview(ctrl.notes),
          contentsview(ctrl.contents),
          submitview(ctrl.submit)
      ]);
    }
  };

  var basicinfoview = function (basicinfo) {
    return m(".newliquor-basicinfo", [
      bke.views.input("Name", basicinfo().name)
    ]);
  };

  var aboutview = function (about) {
    return m(".newliquor-about", [
      subtitle("Strategic information"),
      bke.views.input("Producer", about().producer),
      bke.views.input("Origin", about().origin)
    ]);
  };

  var imagesview = function (images) {
    return m(".newliquor-images", [
      subtitle("Imagery"),
      bke.views.input("Large", images().external, "url"),
      bke.views.input("Thumb", images().external_thumb, "url")
    ]);
  };

  var categoryview = function (category) {
    var liquortypes = m.prop([
      "Spirit",
      "Wine",
      "Beer",
      "Cider"
    ]);
    return m(".newliquor-category", [
      subtitle("Type of liquor"),

      bke.views.datalist("Type", category().primary, liquortypes),
      bke.views.input("Subtype", category().secondary),
      bke.views.input("Specific", category().tertiary),
      bke.views.input("Style", category().style),
      bke.views.input("Varietal", category().varietal)
    ]);
  };



  var packagingview = function (packaging) {
    return m(".newliquor-packaging", [
      subtitle("The container is like"),
      bke.views.input("Size", packaging().size_ml),
      bke.views.input("Material", packaging().package)
    ]);
  };

  var priceview = function (price) {
    return m(".newliquor-price", [
      subtitle("Price observations"),
      bke.views.input("Price", price()[0].price),
      bke.views.input("Country", price()[0].country)
    ]);
  };

  var notesview = function (notes) {
    return m(".newliquor-notes", [
      subtitle("Subjective writing"),
      bke.views.input("Description", notes().description),
      bke.views.input("Serving suggestion", notes().serving_suggestion),
      bke.views.input("Tasting notes", notes().tasting_note)
    ]);
  };

  var contentsview = function (contents) {
    return m(".newliquor-contents", [
      subtitle("Disclose the contents"),
      bke.views.input("Kosher", contents().kosher, "checkbox"),
      bke.views.input("Alcohol content", contents().alcohol_content),
      bke.views.input("Sugar content", contents().sugar)
    ]);
  };

  var submitview = function (submit) {
    return m(".newliquor-submit", [
      m("button", {onclick: submit}, "Submit")
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

  var categorymodel = function (model) {
    model = model || {};
    return m.prop({
      primary: m.prop(model.primary || ""),
      secondary: m.prop(model.secondary || ""),
      tertiary: m.prop(model.tertiary || ""),
      style: m.prop(model.style || ""),
      varietal: m.prop(model.varietal || ""),
      tags: m.prop(model.tags || [])
    });
  };

  var packagingmodel = function (model) {
    model = model || {};
    return m.prop({
      size_ml: m.prop(model.size_ml || 0),
      package: m.prop(model.package || "")
    });
  };

  var pricemodel = function (model) {
    return m.prop(model || [{
      price: m.prop(0),
      country: m.prop("")
    }]);
  };

  var notesmodel = function (model) {
    model = model || {};
    return m.prop({
      serving_suggestion: m.prop(model.serving_suggestion || ""),
      tasting_note: m.prop(model.tasting_note || ""),
      description: m.prop(model.description || "")
    });
  };

  var contentsmodel = function (model) {
    model = model || {};
    return m.prop({
      kosher: m.prop(model.kosher || false),
      alcohol_content: m.prop(model.alcohol_content || 0),
      sugar: m.prop(model.sugar || 0)
    });
  };

  // var liquormodel = function () {
  //   var basicinfo = basicinfomodel();
  //   var about = aboutmodel();
  //   var images = imagesmodel();
  //   var category = categorymodel();
  //   var packaging = packagingmodel();
  //   var prices = pricemodel();
  //   var notes = notesmodel();
  //   var contents = contentsmodel();
  //   return {
  //     basicinfo: basicinfo,
  //     about: about,
  //     images: images,
  //     category: category,
  //     packaging: packaging,
  //     prices: prices,
  //     notes: notes,
  //     contents: contents
  //   };
  // };


  var subtitle = function (text) {
    return m(".addliquor-subtitle", text);
  };

  var postLiquor = function (liquor) {
    return m.request({
      method: "POST",
      url: "/api/liquor",
      data: liquor
    });
  };

})(window.bke = window.bke || {});
