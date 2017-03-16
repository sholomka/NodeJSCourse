const {getUserById, getUsers, userSave, userEdit, userDelete} = require('../managers/dbManager');

module.exports = {
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


