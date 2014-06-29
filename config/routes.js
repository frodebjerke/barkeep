module.exports = function (app) {
  var homeCtrl = require('../app/controllers/home');
  var bottleCtrl = require('../app/controllers/bottle');
  var userCtrl = require('../app/controllers/user');
  var drinkCtrl = require('../app/controllers/drink');
  var liquorCtrl = require('../app/controllers/liquor');

  app.get("/", homeCtrl.index);

  app.get("/api/bottles", bottleCtrl.list);
  app.get("/api/bottles/:id", bottleCtrl.get);
  app.post("/api/bottles", bottleCtrl.create);

  app.get("/api/users", userCtrl.list);
  app.get("/api/users/:id", userCtrl.get);
  app.post("/api/users", userCtrl.create);

  app.get("/api/drinks/:id", drinkCtrl.get);
  app.get("/api/drinks", drinkCtrl.list);
  app.post("/api/drink", drinkCtrl.drink);

  app.get("/api/liquor/:productno", liquorCtrl.get);

  app.get("/search/liquor/:query", liquorCtrl.search);
};
