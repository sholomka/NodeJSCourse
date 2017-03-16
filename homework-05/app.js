const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('./routes');
const app = new Koa();
const helpers = fs.readdirSync(path.join(__dirname, 'helpers'));

const User = require('./models/user');

helpers.forEach(helper => require('./helpers/' + helper)(app, __dirname));
app.use(router.routes());

module.exports = app;

