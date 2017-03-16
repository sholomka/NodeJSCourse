const passport = require('koa-passport');


module.exports = {
    getIndexPage: async (ctx) => {
        if (ctx.isAuthenticated()) { // ctx.req.user
            ctx.body = ctx.render('welcome');
        } else {
            ctx.body = ctx.render('login');
        }
    },

   /* login: async (ctx, next) => {
        // запускает стратегию, станадартные опции что делать с результатом
        // опции @https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js
        // можно передать и функцию
        await passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            //failureMessage: true // запишет сообщение об ошибке в session.messages[]
            failureFlash: true // req.flash, better

            // assignProperty: 'something' присвоить юзера в свойство req.something
            //   - нужно для привязывания акков соц. сетей
            // если не стоит, то залогинит его вызовом req.login(user),
            //   - это поместит user.id в session.passport.user (если не стоит опция session:false)
            //   - также присвоит его в req.user
        })(ctx, next);

    },*/


    login: async (ctx, next) => {
        // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
        // it returns the middleware to delegate
        const middleware = passport.authenticate('local', function(err, user, info) {
            if (user) {
                ctx.body = user;
            }
        });

        await middleware(ctx, next);
    },





    logout: async function(ctx, next) {
        ctx.logout();

        ctx.session = null; // destroy session (!!!)

        ctx.redirect('/');
    },

    githubAuth: async function(ctx, next) {
        passport.authenticate('github', {scope: ['user','repo']})
    },


    githubAuthCallback: async function(ctx, next) {
        passport.authenticate('github', {successRedirect:'/', failureRedirect: '/'})
    },

};


