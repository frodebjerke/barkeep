(function (bke) {
  bke.addbottle.newliquor = {
    controller: function () {
      var liquormodel = {
        name: m.prop(""),
        about: aboutmodel(),
        images: imagesmodel(),
        category: categorymodel(),
        notes: notesmodel(),
        contents: contentsmodel(),
      };
      liquormodel.submit = function () {
        postLiquor(liquormodel).then(function (res) {
          m.route("/addbottle/"+res.id);
        });
      };

      return liquormodel;
    },
    view: function (ctrl) {
      return m(".el-newliquor", [
          nameview(ctrl.name),
          aboutview(ctrl.about),
          imagesview(ctrl.images),
          categoryview(ctrl.category),
          notesview(ctrl.notes),
          contentsview(ctrl.contents),
          submitview(ctrl.submit)
      ]);
    }
  };

  var nameview = function (name) {
    return m(".newliquor-name", [
      bke.views.input("Name", name)
    ]);
  };

  var aboutview = function (about) {
    return m(".newliquor-about", [
      subtitle("Strategic information"),
      bke.views.input("Producer", about().producer),
      bke.views.input("Origin", about().origin),
      bke.views.input("Region", about().region)
    ]);
  };

  var imagesview = function (images) {
    return m(".newliquor-images", [
      subtitle("Imagery"),
      bke.views.input("Large", images().large, "url"),
      bke.views.input("Thumb", images().thumb, "url")
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
      bke.views.input("Price", price().price),
      bke.views.input("Country", price().country)
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

  var aboutmodel = function (model) {
    model = model || {};
    return m.prop({
      producer: m.prop(model.producer || ""),
      origin: m.prop(model.origin || ""),
      region: m.prop(model.region || "")
    });
  };

  var imagesmodel = function (model) {
    model = model || {};
    return m.prop({
      large: m.prop(model.large || ""),
      thumb: m.prop(model.thumb || "")
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
      sugar: m.prop(model.sugar || "")
    });
  };

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
