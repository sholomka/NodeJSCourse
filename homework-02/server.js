'use strict';

const http = require('http');
const url = require('url');
const config = require('config');
const path = require('path');
const ajax = require('./ajax');

module.exports = http.createServer((req, res) => {
    let pathName = decodeURI(url.parse(req.url).pathname),
        fileName = pathName.slice(1),
        filePath = pathName === '/' ? config.get('publicRoot') + '/index.html' : path.join(config.get('filesRoot'), fileName);

    if (fileName.includes('/') || fileName.includes('..')) {
        res.statusCode = 400;
        res.end('Nested paths are not allowed');
        return;
    }

    switch(req.method) {
        case 'GET':
            ajax.getFile(filePath, res);
            break;

        case 'POST':
            if (!fileName) {
                res.statusCode = 404;
                res.end('file not found');
            }

            ajax.postFile(filePath, req, res);
            break;

        case 'DELETE':
            ajax.deleteFile(filePath, res);
            break;

        default:
            res.statusCode = 502;
            res.end("Not implemented");
    }

});
