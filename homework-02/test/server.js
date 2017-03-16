const request = require('request');
const server = require('../server');
require('should');

describe('server', function() {

    before(() => server.listen(3000, '127.0.0.1'));
    after(() => server.close());

    describe('GET /', function() {
        it('returns html', done => {
            request('http://127.0.0.1:3000', function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }

                response.statusCode.should.equal(200);
                response.headers['content-type'].should.equal('text/html');
                done();
            });
        });
    });

    describe('POST /', function() {
        it('returns html', done => {
            request('http://127.0.0.1:3000', function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }

                response.statusCode.should.equal(200);
                response.headers['content-type'].should.equal('text/html');
                done();
            });
        });
    });

    describe('DELETE /', function() {
        it('returns html', done => {
            request('http://127.0.0.1:3000', function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }

                response.statusCode.should.equal(200);
                response.headers['content-type'].should.equal('text/html');
                done();
            });
        });
    });
});