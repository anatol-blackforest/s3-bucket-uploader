const AWS = require('aws-sdk');
const Busboy = require('busboy');

const errorHandler = require('./error');

const {BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = require('./config');

module.exports = async function(req, res, next) {

   try{

        const busboy = new Busboy({ headers: req.headers });
        
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            const s3bucket = new AWS.S3({
                params: {Body: file, Bucket: BUCKET_NAME, Key: filename},
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            });

            s3bucket.upload().on('httpUploadProgress', function (evt) {
                console.log(evt);
            }).send(function (err, fileData) {
                console.log('УРААА!! After Upload: ' + new Date());
                req.fileData = fileData;
                next()
            });

        });

        req.pipe(busboy);

   }catch(e){
        errorHandler(res, e)
   }

}