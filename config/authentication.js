var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , user = require('../app/controllers/user');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var url = process.env.BARKEEP_URL || 'http://localhost:3000';
passport.use(new FacebookStrategy({
    clientID: process.env.FB_CID || 231921907017844,
    clientSecret: process.env.FB_SECRET,
    callbackURL: url+"/authentication/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    user.authenticate(profile, function (err, user) {
      if (err) return done(err);
      console.log("User authenticated: "+user.name);
      done(null, user);
    });
  }
));
