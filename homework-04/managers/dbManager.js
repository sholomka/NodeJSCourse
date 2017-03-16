const db = [
    {message: 'test0'},
    {message: 'test1'},
    {message: 'test2'}
];

const fakeDelay = 1000;

module.exports = {
    getAll: async (ctx) => {
        ctx.body = db;
    },
    add: async (message) => {
        db.push({message: message});
        await setTimeout(() => db, fakeDelay);
    }
};
