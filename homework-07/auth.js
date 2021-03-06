const passport = require('koa-passport');
const User = require('./models/user.js');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user._id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, done);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username, password: password, isActive: '1' }, done);
}));

