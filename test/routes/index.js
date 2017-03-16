const Router = require('koa-router');
const router = new Router();
const {getIndexPage, login, logout, githubAuth, githubAuthCallback} = require('../controllers/indexController');

router
    .get('/', getIndexPage)
    .post('/login', login)
    .post('/logout', logout)
    .get('/auth/github', githubAuth)
    .get('/auth/github/callback', githubAuthCallback);

exports.routes = () => router.routes();

