
// Usually served by Nginx
const serve = require('koa-static');

module.exports = app => app.use(serve('public'));
