const passport = require('koa-passport');
const LocalStrategy  = require('passport-local');
const User = require('../models/user');

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
        usernameField: 'email', // 'username' by default
        passwordField: 'password',
        passReqToCallback: true // req for more complex cases
    },
    // Три возможных итога функции
    // done(null, user[, info]) ->
    //   strategy.success(user, info)
    // done(null, false[, info]) ->
    //   strategy.fail(info)
    // done(err) ->
    //   strategy.error(err)
    function(email, password, done) {
        User.findOne({ email }, (err, user) => {
            if (err) {
                console.error(err);

               return done(err);
            }

            if (!user || !user.checkPassword(password)) {
                // don't say whether the user exists
                return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
            }
            return done(null, user);
        });
    }
));


// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
    done(null, user.id); // uses _id as idField
});

passport.deserializeUser(function(id, done) {
    User.findById(id, done); // callback version checks id validity automatically
});



module.exports = passport;