var m = require('mithril');
var _ = require('lodash');
var Bottle = require('../../models/Bottle');
var Drink = require('../../models/Drink');

module.exports = {
  controller: function () {
    this.history = m.prop([]);
    var bottles = m.prop([]);
    Bottle.getAll()
      .then(_.partialRight(_.map, bottleToEvent))
      .then(orderByDate)
      .then(bottles)
      .then(Drink.getAll)
      .then(_.partialRight(_.map, drinkToEvent))
      .then(mergeInOrder(bottles))
      .then(this.history);
   },
  view: function (ctrl) {
    return m("", ctrl.history().map(historicalEvent));
  }
};

function historicalEvent(ev) {
  var action = ev.type() === "bottle" ? " added a new bottle of " : " poured from ";
  return m("", [
    m("span", ev.added.fromNow()),
    m("span", ev.user() + action + ev.name())
  ]);
}

var Event = function (data) {
  this.id = data.id;
  this.type = data.type;
  this.name = data.name;
  this.added = data.added;
  this.user = data.user;
};

function bottleToEvent(bottle) {
  return new Event({
    id: bottle.id,
    type: m.prop("bottle"),
    name: bottle.name,
    added: bottle.added,
    user: bottle.owner_name
  });
}

function drinkToEvent(drink) {
  return new Event({
    id: drink.id,
    type: m.prop("drink"),
    name: drink.bottle_name,
    added: drink.poured,
    user: drink.user_name
  });
}

function orderByDate(events) {
  return _.sortBy(events, function (event) {
    return -event.added();
  });
}

function mergeInOrder(first) {
  return function (second) {
    return orderByDate(first().concat(second));
  };
}
