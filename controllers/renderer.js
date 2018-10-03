module.exports = function(result) {

    return new Promise(function(resolve, reject) {
        const {res, data} = result
        res.json(data)
        resolve()
    })

}