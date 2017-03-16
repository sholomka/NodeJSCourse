const sendMail = require('./libs/sendMail');
const mongoose = require('./libs/mongoose');


module.exports = {
    sendMail: async (user) => {

        let letter = await sendMail({
            template: 'hello',
            subject: 'Привет',
            to: 'sholomka@gmail.com',
            user: {
                name: user.username,
                password: user.password,
                href: `http://localhost:3000/confirmation/${user._csrf}`
            }
        });

        console.log(letter);

        // mongoose.disconnect();
    }
};


// (async function () {
//
//   let letter = await sendMail({
//     template:     'hello',
//     subject:      'Привет',
//     to:           'sholomka@gmail.com',
//     name:         'Sergey'
//   });
//
//   console.log(letter);
//
//   mongoose.disconnect();
//
// })().catch(console.error);
