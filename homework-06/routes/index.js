const Router = require('koa-router');
const router = new Router();
const {getIndexPage, login, logout} = require('../controllers/indexController');

router
    .get('/', getIndexPage)
    .post('/login', login)
    .post('/logout', logout);


exports.routes = () => router.routes();

