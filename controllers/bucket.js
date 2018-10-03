const Busboy = require('busboy');
const localUploader = require('./uploader');
const thumbinator = require('./thumbinator');
const bucketUploader = require('./bucket');
const renderer = require('./renderer');
const errorHandler = require('./error');

module.exports = function(req, res) {

    new Promise(function(resolve, reject) {
        if(!req.headers["content-length"]) return reject("content-length header expected")
        resolve({req, res})
    })
    .then((data) => { 
        return localUploader(data)
    })
    .then((data) => { 
        thumbinator(data)
    })
    // .then((data) => { 
    //     bucketUploader(data)
    // })
    // .then((data) => { 
    //     bucketUploader(data)
    // })
    .then((data) => { 
        return renderer(data)
    })
    .catch((err) => {
        errorHandler(res, err)
    });
 
 }