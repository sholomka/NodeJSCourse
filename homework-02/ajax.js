const fs = require('fs');
const mime = require('mime');

exports.getFile = (filePath, res) => {
    let readStream = fs.createReadStream(filePath);

    readStream
        .on('error', err => {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('file not found');
            } else {
                console.error(err);
                if (!res.headersSent) {
                    res.statusCode = 500;
                    res.end('Internal error');
                } else {
                    res.end();
                }
            }
        })
        .on('open', () => {
            res.setHeader('Content-Type', mime.lookup(filePath))
        })
        .pipe(res);

    res.on('close', () => {
        readStream.destroy();
    });
};

exports.postFile = (filePath, req, res) => {
  let writeStream = new fs.WriteStream(filePath, {flags: 'wx'});

  req.pipe(writeStream);
};

exports.deleteFile = (fileName, res) => {
    fs.stat(fileName, function(err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        fs.unlink(fileName, function(err) {
            if (err) throw err;
            res.end(res.statusCode + ' Ok');
        });
    });
};


