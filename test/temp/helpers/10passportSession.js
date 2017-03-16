const passport = require('../libs/passport');

module.exports = app => app.use(require('koa-passport').session());
