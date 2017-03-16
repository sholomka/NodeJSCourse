const {add} = require('../managers/dbManager');

module.exports = {
    index: async (ctx) => {
        await ctx.render('index', {title: 'KOA app'});
    },

    publish: async(ctx) => {
        ctx.body = add(JSON.parse(ctx.request.body).message);
    }
};


