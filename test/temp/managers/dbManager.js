const User = require('../models/user');

module.exports = {
    userSave: async (ctx) => {
        try {
            let user = await User.create(ctx.request.body);
            ctx.body = user;
        } catch(err) {
            ctx.body = err;
        }
    },

    getUserById: async (ctx, id) => {
        try {
            let user = await User.findById(id);
            ctx.body = user;
        } catch(err) {
            ctx.body = err;
        }
    },

    getUsers: async (ctx) => {
        await User.find({}, (err, user) => {
            if (err) throw err;
            ctx.body = user;
        });
    },

    userEdit: async (ctx, id) => {
        await User.update(
            {_id: id},
            {name: 'Ivan', email: 'sholomka@gmail.com'},
            {multi: false},
            (err, rows_updated) => {
                if (err) throw err;
            }
        );

        ctx.body = 'OK';
    },

    userDelete: async (ctx, id) => {
        await User.findById(id).remove();
        ctx.body = 'Ok';
    }
};
