const AWS = require('aws-sdk');
const errorHandler = require('../modules/error');

module.exports = async function(req, res, next) {

    try{
        const {BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = require('./config');

        const s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
        });
        s3bucket.createBucket(function () {
            const params = {
                Bucket: BUCKET_NAME,
                Key: req.fileData.Key
            };
            s3bucket.getObject(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                    return errorHandler(res, err)
                }
                console.log('success');
                console.log(data);
                // mpeg thumbinator wil be here
                next()
            });
        });
    }catch(e){
        errorHandler(res, e)
    }

}