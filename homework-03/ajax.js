const fs = require('fs');
const mime = require('mime');
const config = require('config');

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
    if (req.headers['content-length'] > config.get('limitFileSize')) {
        res.statusCode = 413;
        res.end('Files is too big');
        return;
    }

    let size = 0;
    let writeStream = new fs.WriteStream(filePath, {flags: 'wx'});

  req
      .on('data', chunk => {
        size += chunk.length;

          if (size > config.get('limitFileSize')) {
              res.statusCode = 413;
              res.setHeader('Connection', 'close');
              res.end('Files is too big');

              writeStream.destroy();
              fs.unlink(filePath, err => {});

          }
      })
      .on('close', () => {
          writeStream.destroy();
          fs.unlink(filePath, err => {});
      })
      .pipe(writeStream);

   writeStream
       .on('error', err => {
           if (err.code == 'EEXIST') {
               res.statusCode = 409;
               res.end('File exists');
           } else {
               console.error(err);
               if (!res.headersSent) {
                res.writeHead(500, {'Connection': 'close'});
                res.write('Internal error');
               }

               fs.unlink(filepath, err => {
                  res.end();
               });
           }
       })
       .on('close', () => {
           res.end('OK');
       })
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


