const express = require('express')

module.exports = function (model_name) {
    const router = express.Router()

    router.post('/', async (req, res) => {
        let payload = {
            token: req.headers.token,
            model: model_name,
            method: "create",
            body: req.body
        }

        const response = await req.fookie.run(payload)
        res.json(response)
    })

    router.get('/', async (req, res) => {
        let payload = {
            token: req.headers.token,
            model: model_name,
            method: "read",
            query: {
                filter: {}
            }
        }
        const response = await req.fookie.run(payload)
        res.json(response)
    })

    router.get('/:id', async (req, res) => {
        let payload = {
            token: req.headers.token,
            model: model_name,
            method: "read",
            query: {
                filter: {
                    pk: req.params.id
                }
            }
        }
        const response = await req.fookie.run(payload)
        res.json(response)
    })
    return router
}