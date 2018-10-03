const ffmpeg = require('fluent-ffmpeg');
const ffmpegStream = require('ffmpeg-stream').ffmpeg;
const converter = ffmpeg()
const fs = require('fs');

const readStream = fs.createReadStream("../public/videos/videoplayback.mp4")

converter.output('../public/videos/' + 'michael.jpg', {vf: 'crop=300:300'})

converter.run()

// new ffmpeg(readStream)
//         .on('filenames', function(filenames) {
//             console.log('Will generate ' + filenames.join(', '))
//         })
//         .on('end', function() {
//             console.log('Screenshots taken');
//             next()
//         })
//         .on('error', function(err) {
//             console.log(err);
//             errorHandler(res, err)
//         })
//         .screenshots({
//             timestamps: [ '50%' ],
//             filename: data.ETag,
//             size: '600x?',
//             folder: '../public/videos/',
//         })