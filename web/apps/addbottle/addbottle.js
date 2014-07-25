(function (bke) {
  bke.addbottle.addBottle = {
    controller: function (liquorid) {
      liquorid = liquorid || m.route.param("id");

      var liquor = fetchLiquor(liquorid);
      var product = productmodel();
      var sacred = m.prop(false);
      var owner = fetchMe();
      var users = fetchUsers();

      var submit = function () {
        var data = {
          liquor: liquor(),
          owner: owner(),
          product: product(),
          sacred: sacred()
        };

        postBottle(data).then(function () {
          m.route("/");
        });
      };
      return {
        liquor: liquor,
        product: product,
        owner: owner,
        users: users,
        sacred: sacred,
        submit: submit
      };
    },
    view: function (ctrl) {
      return m(".el-addbottle", [
        m(".addbottle-liquor", bke.views.liquor(ctrl.liquor())),
        chooseproduct(ctrl.liquor().products, ctrl.product),
        pickowner(ctrl.owner, ctrl.users),
        sacred(ctrl.sacred),
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


  var productmodel = function (model) {
    model = model || {};
    return m.prop({
      price: m.prop(model.price || 0),
      size_ml: m.prop(model.size_ml || 0),
      units: m.prop(model.units || 1),
      material: m.prop(model.material || "bottle")
    });
  };

  var sortByLogged = function (a, b) {
    return b.logged - a.logged;
  };

  var chooseproduct = function (products, product) {
    var sortedProducts = products.sort(sortByLogged);
    return m(".addbottle-product", [
      m("select.addbottle-list", {
        onchange: m.withAttr("value", function (i) {
          var chosen = productmodel(sortedProducts[i]);
          product(chosen());
        })
      },[sortedProducts.map(function (p, i) {
        return m("option", {
          value: i
        }, p.units + "x"+ (p.units ? p.size_ml/p.units : p.size_ml) + "ml " + p.material);
      })]),
      addProduct(product)
    ]);
  };

  var addProduct = function (product) {
    return m("", [
      bke.views.input("Price", product().price),
      bke.views.input("Size", product().size_ml),
      bke.views.input("Units", product().units),
      bke.views.input("Material", product().material)
    ]);
  };



  var pickowner = function (owner, users) {
    return m(".addbottle-pickowner", [
      m("label","Owner"),
      m(".clearfix"),
      m("ul", [
        m("li.addbottle-owner", {
          style: "background-image:url('"+profilePicture(owner().id)+"');"
        }),
        users().map(function (user) {
          return m("li", {
            onclick: function () {
              owner(user);
            },
            style: "background-image:url('"+profilePicture(user.id)+"');"
          }, m(".addbottle-user", {
          }));
        })
      ])
    ]);
  };

  var sacred = function (prop) {
    return m(".addbottle-sacred", [
      m("label", "Is this bottle totally sacred to you?"),
      m("input", {
        type: "checkbox",
        value: prop(),
        onchange: m.withAttr("value", prop)
      })
    ]);
  };

  var submit = function (submit) {
    return m(".addbottle-submit", [
      m("button", {onclick: submit}, "Submit")
    ]);
  };

  var fetchLiquor = function (id) {
    var liquor = m.prop({});

    m.request({
      method: "GET",
      url: "/api/liquor/"+ id
    }).then(liquor);

    return liquor;
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

  var fetchMe = function () {
    var me = m.prop({});

    m.request({
      method: "GET",
      url: "/api/me"
    }).then(me);

    return me;
  };

  var fetchUsers = function () {
    var users = m.prop([]);
    m.request({
      method: "GET",
      url: "/api/users"
    }).then(users);

    return users;
  };


  var profilePicture = function (id) {
    return "https://graph.facebook.com/"+id+"/picture";
  };

})(window.bke = window.bke || {});
