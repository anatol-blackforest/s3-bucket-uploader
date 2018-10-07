module.exports = function(result) {
    const {res, data} = result
    console.log(result)
    console.log("OURDATA")
    console.log(data)
    res.send(data)
}