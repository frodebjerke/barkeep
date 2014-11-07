var m = require('mithril');

var Liquor = require('../../models/Liquor');
var User = require('../../models/User');
var Product = require('../../models/Product');

var inputView = require('../../shared/views/input');
var liquorView = require('../../shared/views/liquor');

module.exports = {
  controller: function (liquorid) {
    liquorid = liquorid || m.route.param("id");

    this.owner = m.prop({});
    this.users = m.prop([]);
    this.liquor = m.prop({});
    this.product = m.prop({});

    User.getMe().then(this.owner);
    User.getAll().then(this.users);

    Liquor.getById(liquorid).then(this.liquor).then(function () {
      var products = this.liquor().products();
      if (products.length) this.product(products[0]);
    }.bind(this));

    this.submit = function () {
      var data = {
        liquor: this.liquor(),
        owner: this.owner(),
        product: this.product(),
        sacred: false
      };

      postBottle(data).then(function () {
        m.route("/");
      });
    }.bind(this);
  },
  view: function (ctrl) {
    return m(".el-addbottle", [
      m(".addbottle-liquor", liquorView(ctrl.liquor())),
      chooseproduct(ctrl.liquor().products, ctrl.product),
      pickowner(ctrl.owner, ctrl.users),
      submit(ctrl.submit)
    ]);
  }
};

var price = function (prop) {
  return m(".addbottle-price",[
    m("label", "Price"),
    m("input", {
      type: "number",
      onchange: m.withAttr("value", prop),
      value: prop()
    })
  ]);
};

var sortByLogged = function (a, b) {
  return b.logged - a.logged;
};

var chooseproduct = function (products, product) {
  var sortedProducts = products().sort(sortByLogged);
  return m(".addbottle-product", [
    m("select.addbottle-list", {
      onchange: m.withAttr("value", function (i) {
        var chosen = sortedProducts[i];
        product(chosen);
      })
    },[sortedProducts.map(function (p, i) {
      return m("option", {
        value: i
      }, p.units() + "x"+ (p.units() ? p.size_ml()/p.units() : p.size_ml()) + "ml " + p.material());
    })]),
    addProduct(product)
  ]);
};

var addProduct = function (product) {
  return m("", [
    inputView("Price", product().price),
    inputView("Size", product().size_ml),
    inputView("Units", product().units),
    inputView("Material", product().material)
  ]);
};



var pickowner = function (owner, users) {
  return m(".addbottle-pickowner", [
    m("label","Owner"),
    m(".clearfix"),
    m("ul", [
      m("li.addbottle-owner", {
        style: "background-image:url('"+profilePicture(owner().id())+"');"
      }),
      users().map(function (user) {
        return m("li", {
          onclick: function () {
            owner(user);
          },
          style: "background-image:url('"+profilePicture(user.id())+"');"
        }, m(".addbottle-user", {
        }));
      })
    ])
  ]);
};

var submit = function (submit) {
  return m(".addbottle-submit", [
    m("button", {onclick: submit}, "Submit")
  ]);
};

var postBottle = function (data) {
  var xhrConfig = function(xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
  };
  return m.request({
    method: "POST",
    url: "/api/bottles",
    config: xhrConfig,
    data: data
  });
};
var profilePicture = function (id) {
  return "https://graph.facebook.com/"+id+"/picture";
};
