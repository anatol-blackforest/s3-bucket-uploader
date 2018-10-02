module.exports = function(req, res, next) {
    let data = req.fileData
    res.json(data)
}