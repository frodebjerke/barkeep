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

User.getAll = function () {
  return m.request({
    method: "GET",
    url: "/api/users",
    type: User
  });
};

module.exports = User;
