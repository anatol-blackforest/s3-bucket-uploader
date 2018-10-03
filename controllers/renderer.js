module.exports = function(data) {

    return new Promise(function(resolve, reject) {
        console.log("gfenrjkgrejk")
        const {req, res, filename, mimetype} = data
        res.json({filename, mimetype})
        resolve()
    })

}