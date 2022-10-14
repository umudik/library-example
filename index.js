(async () => {
    require("dotenv").config()
    const createCrud = require("./src/route/create_crud.js")
    const user = require("./src/route/user.js")
    const express = require("express")
    const bodyparser = require("body-parser")
    const fookie = await require("./src/mod.js")()
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
    app.use("/books", createCrud("book"));
    app.use("/users", user);
    app.use("/scores", createCrud("score"));
    app.use("/borrows", createCrud("borrow"));

    app.listen(3000)
    console.log("done.");
})()