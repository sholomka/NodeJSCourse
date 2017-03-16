const Router = require('koa-router');
const router = new Router();
const {getAll} = require('../managers/dbManager');
const {index, publish} = require('../controllers/indexController');

router
    .get('/', index)
    .post('/publish', publish)
    .get('/subscribe', getAll);

exports.routes = () => router.routes();