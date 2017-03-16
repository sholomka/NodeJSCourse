/**
 * view
 *
 * @param app
 * @param dirname
 */

module.exports = (app, dirname) => app.use(require('koa-views')(dirname + '/templates', {extension: 'pug'}));


