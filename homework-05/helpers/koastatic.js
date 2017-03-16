/**
 * Static files
 *
 * @param app
 * @param dirname
 */

module.exports = (app, dirname) => app.use(require('koa-static')(dirname));


