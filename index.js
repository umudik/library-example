(async () => {
    require("dotenv").config()
    const createCrud = require("./src/route/create_crud.js")
    const user = require("./src/route/user.js")
    const book = require("./src/route/book.js")
    const borrow = require("./src/route/borrow.js")
    const score = require("./src/route/score.js")
    const express = require("express")
    const bodyparser = require("body-parser")
    const fookie = await require("./src/mod.js")()
    const avarage_score = require("./src/routines/calculate_avarage_score.js")
    const app = express()
    app.use(bodyparser.json());

    app.use((req, res, next) => {
        if (req.headers.token) {
            next()
        } else {
            res.json({
                status: false,
                error: "need_token"
            })
        }
    });
    app.use((req, res, next) => {
        req.fookie = fookie
        next()
    });

    // Routes
    app.use("/books", book);
    app.use("/users", user);
    app.use("/scores", score);
    app.use("/borrows", borrow);

    // Routines
    await fookie.use(avarage_score)

    app.listen(3000)
    console.log("done.");

})()
