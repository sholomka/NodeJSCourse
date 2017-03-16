const Router = require('koa-router');
const router = new Router();
const {getIndexPage, login, getUserById, getUsers, userSave, userEdit, userDelete} = require('../controllers/indexController');

router
    .get('/', getIndexPage)
    .post('/login', login)
    .get('/users/:id', getUserById)
    .get('/users', getUsers)
    .post('/users', userSave)
    .patch('/users/:id', userEdit)
    .delete('/users/:id', userDelete);

exports.routes = () => router.routes();