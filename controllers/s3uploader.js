const AWS = require('aws-sdk');
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');
const stat = promisify(fs.stat);

const {BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = require('./config');

module.exports = function(data) {
    
    let {res, filename, thumb} = data

    return new Promise(function(resolve, reject) {

        try{

            const incomingFile = path.join(__dirname, "/../tmp/original/", filename)
            const incomingThumb = path.join(__dirname, "/../tmp/thumb/", thumb)
            // const incomingStream = fs.createReadStream(incomingFile)

            fs.readFile(incomingFile, function (err, file) { 

                const s3bucket = new AWS.S3({
                    params: {Body: file, Bucket: BUCKET_NAME, Key: filename},
                    accessKeyId: IAM_USER_KEY,
                    secretAccessKey: IAM_USER_SECRET,
                    Bucket: BUCKET_NAME
                });
    
                s3bucket.upload().on('httpUploadProgress', function (evt) {
                    console.log(evt);
                }).send(function (e, data) {
                    stat(incomingFile).then(() => fs.unlink(incomingFile)).then(() => stat(incomingThumb).then(() => fs.unlink(incomingThumb)))
                    console.log(e)
                    console.log('Successfully uploaded data'); 
                    resolve({data, res})
                });
               
            }); 

        }catch(e){
            reject(e)
        }
    })

}