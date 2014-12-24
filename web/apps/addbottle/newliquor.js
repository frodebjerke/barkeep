var m = require('mithril');
var inputView = require('../../shared/views/input');
var datalist = require('../../shared/views/datalist');
var Liquor = require('../../models/Liquor');

module.exports = {
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
      Liquor.create(liquormodel).then(function (res) {
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
    inputView("Name", name)
  ]);
};

var aboutview = function (about) {
  return m(".newliquor-about", [
    subtitle("Strategic information"),
    inputView("Producer", about().producer),
    inputView("Origin", about().origin),
    inputView("Region", about().region)
  ]);
};

var imagesview = function (images) {
  return m(".newliquor-images", [
    subtitle("Imagery"),
    inputView("Large", images().large, "url"),
    inputView("Thumb", images().thumb, "url")
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

    datalist("Type", category().primary, liquortypes),
    inputView("Subtype", category().secondary),
    inputView("Specific", category().tertiary),
    inputView("Style", category().style),
    inputView("Varietal", category().varietal)
  ]);
};



var packagingview = function (packaging) {
  return m(".newliquor-packaging", [
    subtitle("The container is like"),
    inputView("Size", packaging().size_ml),
    inputView("Material", packaging().package)
  ]);
};

var priceview = function (price) {
  return m(".newliquor-price", [
    subtitle("Price observations"),
    inputView("Price", price().price),
    inputView("Country", price().country)
  ]);
};

var notesview = function (notes) {
  return m(".newliquor-notes", [
    subtitle("Subjective writing"),
    inputView("Description", notes().description),
    inputView("Serving suggestion", notes().serving_suggestion),
    inputView("Tasting notes", notes().tasting_note)
  ]);
};

var contentsview = function (contents) {
  return m(".newliquor-contents", [
    subtitle("Disclose the contents"),
    inputView("Kosher", contents().kosher, "checkbox"),
    inputView("Alcohol content", contents().alcohol_content),
    inputView("Sugar content", contents().sugar)
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
