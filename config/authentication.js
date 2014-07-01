var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , user = require('../app/controllers/user');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: 230569583819743,
    clientSecret: "b9e54ed47235faff4a47783c0b675edb",
    callbackURL: "http://localhost:3000/authentication/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    user.authenticate(profile, function (err, user) {
      if (err) return done(err);
      done(null, user);
    });
  }
));
