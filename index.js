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



    // this might be discusting solution.
    setInterval(async () => {
        const read_book_res = await fookie.run({
            token: process.env.SYSTEM_TOKEN,
            model: "book",
            method: "read",
        })
        const books = read_book_res.data
        for (book of books) {
            const read_scores_res = await fookie.run({
                token: process.env.SYSTEM_TOKEN,
                model: "score",
                method: "read",
                query: {
                    filter: {
                        book: book.id
                    }
                }
            })
            const scores = read_scores_res.data
            const avarage = (fookie.lodash.sumBy(scores, "score") / scores.length) || book.avarage_score
            console.log(avarage);
            await fookie.run({
                token: process.env.SYSTEM_TOKEN,
                model: "book",
                method: "update",
                query: {
                    filter: {
                        id: book.id
                    }
                },
                body: {
                    avarage_score: avarage
                }
            })
        }
        console.log("calculating avarage score");
    }, 1000 * 100000);

})()