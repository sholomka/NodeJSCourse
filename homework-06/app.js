if (process.env.TRACE) {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

require('koa-csrf')(app);



const helpers = fs.readdirSync(path.join(__dirname, 'helpers')).sort();
helpers.forEach(helper => require('./helpers/' + helper)(app, __dirname));


// const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
//
// handlers.forEach(handler => require('./middlewares/' + handler).init(app));


const router = require('./routes');
app.use(router.routes());


module.exports = app;



