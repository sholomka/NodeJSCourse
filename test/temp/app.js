if (process.env.TRACE) {
    require('./libs/trace');
}


const Koa = require('koa');
const app = new Koa();

const fs = require('fs');

require('koa-csrf')(app);

const path = require('path');


const helpers = fs.readdirSync(path.join(__dirname, 'helpers')).sort();
helpers.forEach(helper => require('./helpers/' + helper)(app, __dirname));


const router = require('./routes');
app.use(router.routes());

module.exports = app;

