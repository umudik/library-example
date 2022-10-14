const createCrud = require("./create_crud.js")
const router = createCrud("user")

router.post('/:user_id/borrow/:book_id', async (req, res) => {
    let payload = {
        token: req.headers.token,
        model: "borrow",
        method: "create",
        body: {
            user: parseInt(req.params.user_id),
            book: parseInt(req.params.book_id),
        }
    }
    console.log(payload);
    const response = await req.fookie.run(payload)
    res.json(response)
})

router.post('/:user_id/return/:book_id', async (req, res) => {
    let payload = {
        token: req.headers.token,
        model: "score",
        method: "create",
        body: {
            user: parseInt(req.params.user_id),
            book: parseInt(req.params.book_id),
            score: req.body.score
        }
    }
    const response = await req.fookie.run(payload)
    res.json(response)
})

module.exports = router
