var m = require('mithril');

var User = function (data) {
  this.id = m.prop(data.id);
  this.firstname = m.prop(data.firstname);
  this.lastname = m.prop(data.lastname);
  this.balance = m.prop(data.balance);
};

User.prototype.name = function () {
  return this.firstname() + " " + this.lastname();
};

User.prototype.image = function () {
  return "https://graph.facebook.com/"+ this.id() +"/picture";
}

User.getMe = function () {
  return m.request({
    method: "GET",
    url: "/api/me",
    type: User
  });
};

User.getAll = function () {
  return m.request({
    method: "GET",
    url: "/api/users",
    type: User
  });
};

module.exports = User;
