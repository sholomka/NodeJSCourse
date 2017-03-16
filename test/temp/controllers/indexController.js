const passport = require('koa-passport');
const {getUserById, getUsers, userSave, userEdit, userDelete} = require('../managers/dbManager');

module.exports = {
    getIndexPage: async (ctx) => {
        await ctx.render('index');
    },


    login: async (ctx, next) => {
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

    },

    getUserById: async (ctx) => {
        let id = ctx.request.url.split('/').slice(-1).join();
        await getUserById(ctx, id);
    },

    getUsers: async (ctx) => {
        await getUsers(ctx);
    },

    userSave: async (ctx) => {
        await userSave(ctx);
    },

    userEdit: async (ctx) => {
        let id = ctx.request.url.split('/').slice(-1).join();
        await userEdit(ctx, id);
    },

    userDelete: async (ctx) => {
        let id = ctx.request.url.split('/').slice(-1).join();
        await userDelete(ctx, id);
    },
};


