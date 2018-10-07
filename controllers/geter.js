const AWS = require('aws-sdk');
const {BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = require('./config');

module.exports = function(info) { 
    
    const Key = info.data.Key
    const res = info.res

    // {
    //     "Location": "https://dwall-dev.s3.amazonaws.com/1538899218247_Polish+Nyan+Cat+with+polish+music+-D.mp4",
    //     "Bucket": "dwall-dev",
    //     "Key": "1538899218247_Polish Nyan Cat with polish music -D.mp4",
    //     "ETag": "\"fc9b87e779964bd4687372cbdbb79186-3\""
    // }

    return new Promise(function(resolve, reject) {

        const s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
        });
        s3bucket.createBucket(function () {
            const params = {
                Bucket: BUCKET_NAME,
                Key
            };
            s3bucket.getObject(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                    reject(err)
                }
                console.log('success');
                console.log(data.Body);
                resolve({res, data: data.Body})
            });
        });

    })

    // s3.getObject(params).on('error', function (err) {
    //     console.log('Error event!');
    // }).createReadStream().on('error', function (err) {
    //     console.log('Error event on stream!');
    // }).pipe(res);


}
