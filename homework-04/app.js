const Koa = require('koa');
const config = require('config');
const fs = require('fs');
const path = require('path');
const router = require('./routes');
const app = new Koa();
const helpers = fs.readdirSync(path.join(__dirname, 'helpers'));

helpers.forEach(helper => require('./helpers/' + helper)(app, __dirname));
app.use(router.routes()).listen(config.get('server.port'));

