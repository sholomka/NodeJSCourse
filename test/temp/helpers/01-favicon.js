
// Usually served by Nginx
const favicon = require('koa-favicon');

module.exports = app => app.use(favicon());
