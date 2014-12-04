var passport = require('passport');

module.exports = function (app) {
  var homeCtrl = require('../lib/controllers/home');
  var bottleCtrl = require('../lib/controllers/bottle');
  var userCtrl = require('../lib/controllers/user');
  var drinkCtrl = require('../lib/controllers/drink');
  var liquorCtrl = require('../lib/controllers/liquor');

  app.get("/", ensureAuthenticated, homeCtrl.index);
  app.get("/landing", homeCtrl.index);

  app.get("/api/bottles", ensureAuthenticated, bottleCtrl.list);
  app.get("/api/bottles/:id", ensureAuthenticated, bottleCtrl.get);
  app.post("/api/bottles", bottleCtrl.create);

  app.get("/api/users", ensureAuthenticated, userCtrl.list);
  app.get("/api/users/:id", ensureAuthenticated, userCtrl.get);
  app.post("/api/users", ensureAuthenticated, userCtrl.create);
  app.get("/api/me", ensureAuthenticated, userCtrl.me);

  app.get("/api/drinks/:id", ensureAuthenticated, drinkCtrl.get);
  app.get("/api/drinks", ensureAuthenticated, drinkCtrl.list);
  app.post("/api/drinks", ensureAuthenticated, drinkCtrl.pourdrink);

  app.get("/api/liquor/:productno", ensureAuthenticated, liquorCtrl.get);
  app.post("/api/liquor", ensureAuthenticated, liquorCtrl.post);

  app.get("/search/liquor", ensureAuthenticated, liquorCtrl.list);
  app.get("/search/liquor/:query", ensureAuthenticated, liquorCtrl.search);
  app.get("/search/bottle", ensureAuthenticated, bottleCtrl.list);
  app.get("/search/bottle/:query", ensureAuthenticated, bottleCtrl.search);

  app.get('/authentication/facebook', passport.authenticate('facebook'));
  app.get('/authentication/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: "/", successRedirect: "/" }
  ));
  app.get("/authentication/logout", function (req, res) {
    req.logout();
    res.redirect("/landing");
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log("authenticating");
  res.redirect('/authentication/facebook');
}
