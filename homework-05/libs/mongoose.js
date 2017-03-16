const mongoose = require('mongoose'),
      config = require('config'),
      url = `${config.get('mongoose.host')}${config.get('mongoose.dbname')}`;

mongoose.Promise = Promise;
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);
// mongoose.set('debug', true);

mongoose.connect(url, {
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    }
});


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('were connected!');
});



module.exports = mongoose;








