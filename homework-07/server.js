const Koa = require('koa');
const CSRF = require('koa-csrf').default;
const app = new Koa();

app.proxy = true;

const convert = require('koa-convert');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const bodyParser = require('koa-bodyparser');
require('./auth');
const passport = require('koa-passport');
const fs    = require('fs');
const route = require('koa-route');
const User = require('./models/user.js');
const {sendMail} = require('./sendMail.js');

app.keys = ['your-session-secret', 'another-session-secret'];

app.use(convert(session({
    store: new MongoStore()
})));

app.use(bodyParser());

app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403
}));

app.use(passport.initialize());
app.use(passport.session());

// Стартовая страница
app.use(route.get('/', function(ctx) {
    ctx.type = 'html';
    let body = fs.readFileSync('templates/login.html', 'utf8');
    ctx.body = body.replace('{csrfToken}', ctx.csrf);
}));

// Регистрация
app.use(route.post('/register', async (ctx) => {
    let user = await User.create(ctx.request.body);

    if (user) {
        sendMail(user).catch(console.error);
        ctx.type = 'html';
        ctx.body = `Перейдите на свою почту для подтверждения регистрации <br><a href="/">Назад</a>`;
    }
}));

app.use(route.get('/register', (ctx) => {
    ctx.type = 'html';
    let body = fs.readFileSync('templates/register.html', 'utf8');
    ctx.body = body.replace('{csrfToken}', ctx.csrf);
}));

// Подтверждение регистрации
app.use(route.get('/confirmation/:token',  (ctx) => {
    let token = ctx.request.url.split('/').slice(-1).join();

    User.findOne({ _csrf: token }, function (err, testUser) {
        if (testUser) {
            console.log('test user exist; activated...');
             User.update(
                {_id: testUser._id},
                {isActive: '1'},
                {multi: false},
                (err, rows_updated) => {
                    if (err) throw err;
                }
            );
        }
    });

    ctx.type = 'html';
    ctx.body = fs.readFileSync('templates/confirmation.html', 'utf8');
}));

// Авторризация
app.use(route.post('/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/'
    })
));

app.use(route.get('/logout', function(ctx) {
    ctx.logout();
    ctx.redirect('/')
}));

app.use(function(ctx, next) {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.redirect('/')
    }
});

app.use(route.get('/app', function(ctx) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('templates/app.html');
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));