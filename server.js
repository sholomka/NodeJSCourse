'use strict';

let http = require('http');
let fs = require('fs');
let url = require('url');
let chat = require('./chat');

http.createServer((req, res) => {
    let pathName = decodeURI(url.parse(req.url).pathname);

    switch(pathName) {
        case '/':
            sendFile('index.html', res);
            break;

        case '/publish':
            let body = '';

            req
                .on('readable', () => {
                    body +=  req.read();

                    if (body.length > 1e4) {
                        res.statusCode = 413;
                        res.end('Message is too big');
                    }

                    console.log('1' + req.read());
                })
                .on('end', () => {
                    try {

                        console.log('2' + typeof body);

                        body = JSON.parse(body);

                    } catch(e) {
                        res.statusCode = 400;
                        res.end('Bad request');
                        return;
                    }

                    chat.publish(body.message);
                    res.end('ok');
                });
            break;

        case '/subscribe':
            chat.subscribe(req, res);
            break;

        default:
            res.statusCode = 404;
            res.end('Page not found');
    }
}).listen(3000);


let sendFile = (fileName, res) => {
    let fileStream = fs.createReadStream(fileName);

    fileStream
        .on('error', () => {
            res.statusCode = 505;
            res.end('Server error');
        })
        .pipe(res);

    res.on('close', () => {
        fileStream.destroy();
    })
};