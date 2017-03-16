const User = require('./models/user');

let user = new User(
    { name: 'Silence' }
);

user.save((err) => {
    if (err) throw err;
    console.log(user.name);
});


User.find({'name': 'Silence'}, (err, users) => {
    for (let user of users) {
        User.update(
            {_id: user._id},
            {name: 'Ivan'},
            {multi: false},
            (err, rows_updated) => {
                if (err) throw err;
                console.log(rows_updated);
            }
        );

        User.findById(user._id, (err, user) => {
            user.remove();
        })
    }
});




















