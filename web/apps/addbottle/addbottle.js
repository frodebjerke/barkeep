(function (bke) {
  bke.addbottle.addBottle = {
    controller: function (liquorid) {
      liquorid = liquorid || m.route.param("id");

      var liquor = fetchLiquor(liquorid);
      var price = m.prop(300);
      var sacred = m.prop(false);
      var owner = fetchMe();
      var users = fetchUsers();

      var submit = function () {
        var data = {
          liquor: liquor(),
          owner: owner(),
          price: price(),
          sacred: sacred()
        };

        postBottle(data).then(function () {
          m.route("/");
        });
      };

      return {
        data: liquor,
        price: price,
        owner: owner,
        users: users,
        sacred: sacred,
        submit: submit
      };
    },
    view: function (ctrl) {
      return m(".el-addbottle", [
        m(".addbottle-liquor", bke.views.liquor(ctrl.data())),
        price(ctrl.price),
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
