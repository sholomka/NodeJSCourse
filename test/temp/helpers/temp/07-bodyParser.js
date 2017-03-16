
// Parse application/json, application/x-www-form-urlencoded
// NOT form/multipart!
const bodyParser = require('koa-bodyparser');
module.exports = app => app.use(bodyParser({
  jsonLimit: '56kb'
}));
