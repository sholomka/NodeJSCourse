const mongoose = require('../libs/mongoose');

let Schema = mongoose.Schema;
let Users = new Schema({
    name: {
        type: String,
        required: "Имя пользователя отсутствует"
    },
    email: {
        type: String,
        required: 'E-mail пользователя не должен быть пустым',
        unique: 'Такой email уже существует',
        validate: [
            {
                validator(value) {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
                },
                msg:       'Некорректный email.'
            }
        ]
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', Users);

module.exports = mongoose.model('User');






