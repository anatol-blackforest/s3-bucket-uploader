const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const stat = promisify(fs.stat);
let targetFile
module.exports = function(data) {

    let {req, res} = data

    return new Promise(function(resolve, reject) {

        try{
            const busboy = new Busboy({ 
                headers: req.headers, 
                limits: {
                    fileSize: 1024*1024*1024 //1gb limit
                } 
            });
    
            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                filename = Date.now() + "_" + filename
                targetFile = path.join(__dirname, "/../tmp/original/" + filename)
                let obj = {req, res, filename, mimetype, targetFile}
                const target = fs.createWriteStream(targetFile)
                file.pipe(target)
                target.on("finish", () => resolve(obj))

            });
    
            req.pipe(busboy);

        }catch(e){
            stat(targetFile).then(() => fs.unlink(targetFile))
            reject(e)
        }
            
    })

}
