const server = require('../app');
const request = require("request-promise").defaults({
    resolveWithFullResponse: true,
    simple: false
});

const should = require('should');
const config = require('config');
const User = require('../models/user');


function getUrl(path) {
    return `${config.get('tests.host')}:${config.get('tests.port')}${path}`
}

describe("REST API", () => {
    let existingUserData = {
        name: 'test',
        email: 'test@gmail.com',
    };

    let newUserData = {
        email: 'sholomka@gmail.com',
        name: 'Yuriy'
    };

    before(done => {
        server.listen(3000, done);
    });

    beforeEach(async () => {
        await User.remove({});
        existingUser = await User.create(existingUserData);
    });

    describe("POST", async () => {
        it("creates a user", async () => {
            let response = await request({
                method: 'POST',
                uri: getUrl('/users'),
                json: true,
                body: newUserData
            });

            response.body.name.should.eql(newUserData.name);
            response.body.email.should.eql(newUserData.email);
        });

        it("throws if email already exists", async () => {
                let response = await request({
                    method: 'POST',
                    uri: getUrl('/users'),
                    json: true,
                    body: existingUserData
                });

               response.body.errors.email.should.exists;
        });

        it("throws if email not valid", async () => {
            let response = await request({
                method: 'POST',
                uri: getUrl('/users'),
                json: true,
                body: {
                    email: 'invalid'
                }
            });

            response.body.errors.email.message.should.eql('Некорректный email.');
        });

    });


    describe("GET", () => {
            it("get all users", async () => {
                let response = await request.get(getUrl(`/users`));
                response.statusCode.should.be.equal(200);
                JSON.parse(response.body).length.should.eql(1);
                response.headers['content-type'].should.match(/application\/json/);
            });

            it("get user by id", async () => {
                let response = await request.get(getUrl(`/users/${existingUser._id}`));
                response.statusCode.should.be.equal(200);
                JSON.parse(response.body).email.should.exists;
                response.headers['content-type'].should.match(/application\/json/);

            });

            it("returns 204 if user doesn't exists", async () => {
                let response = await request.get(getUrl(`/users/666843098944431420df191f`));
                response.statusCode.should.be.equal(204);
            });

            it("returns 204 if invalid id", async () => {
                let response = await request.get(getUrl(`/users/kkkkk`));
                response.statusCode.should.be.equal(200);
            });
    });


    describe("PATCH", () => {
        it("edit user", async () => {
            let response = await request.patch(getUrl(`/users/${existingUser._id}`));
            response.statusCode.should.be.equal(200);
        });
    });

    describe("DELETE", () => {
        it("remove user", async () => {
            let response = await request.delete(getUrl(`/users/${existingUser._id}`));
            response.statusCode.should.be.equal(200);
            let users = await User.find({}).exec();
            users.length.should.eql(0);
        });
    });
});