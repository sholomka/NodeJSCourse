const app = require('./app');
const config = require('config');

app.listen(config.get('server.port'));



