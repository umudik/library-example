const fookie = require("fookie")
const databases = require("fookie-databases")
const cache = require("fookie-cache")
module.exports = async function () {
    await fookie.init()
    await fookie.use(databases.postgresql)
    await fookie.use(cache)
    await fookie.use(require("./model/user"))
    await fookie.use(require("./model/book"))
    await fookie.use(require("./model/score"))
    await fookie.use(require("./model/borrow"))
    return fookie
}