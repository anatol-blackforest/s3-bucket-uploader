const AWS = require('aws-sdk');
const {BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = require('./config');

module.exports = function(req, res, next) {
    const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        const params = {
            Bucket: BUCKET_NAME,
            Key: req.params.img
        };
        s3bucket.getObject(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
                return res.render('index', { title: err });
            }
            console.log('success');
            console.log(data);
            res.sendFile(data);
        });
    });
}
