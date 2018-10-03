const AWS = require('aws-sdk');
const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const errorHandler = require('../controllers/error');

module.exports = function(data) {

    let {req, res, filename, mimetype, targetFile} = data
    targetFolder = path.join(__dirname, "/../tmp/thumb/")

    return new Promise(function(resolve, reject) {

        ffmpeg(targetFile)
            .on('end', function() {
                console.log('Screenshots taken');
                let obj = {...data, thumb: filename + ".jpg"}
                resolve(obj);
            })
            .on('error', function(err) {
                console.log(err);
                reject("Screenshot error");
            })
            .screenshots({
                timestamps: [ '50%' ],
                filename: filename + ".jpg",
                size: '600x?',
                folder: targetFolder,
            })

    })

}
