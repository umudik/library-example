module.exports = async function (ctx) {
    await ctx.model({
        name: "borrow",
        database: "postgresql",
        schema: {
            user: {
                relation: "user",
                required: true,
            },
            book: {
                relation: "user",
                required: true,
            },
            start: {
                type: "number",
                required: true,
            },
            deadline: {
                type: "number",
                required: true,
            },
            end: {
                type: "number",
            },

        },
        lifecycle: {
            create: { modify: ["borrow_set_default_time"], rule: ["borrow_book_is_avaible"], role: ["system"] },
            read: { role: ["system"] },
            update: { role: ["system"] },
            delete: { role: ["system"] },
            count: { role: ["system"] },
        }
    })

    await ctx.lifecycle({
        name: "borrow_set_default_time",
        function: async function (payload, ctx, state) {
            payload.body.start = Date.now()
            payload.body.deadline = Date.now() + (1000 * 60 * 60 * 24 * 7)
        }
    })

    await ctx.lifecycle({
        name: "borrow_book_is_avaible",
        function: async function (payload, ctx, state) {
            const book_is_avaible = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "borrow",
                method: "count",
                query: {
                    filter: {
                        end: null,
                        book: payload.body.book
                    }
                }
            })

            if (book_is_avaible.data > 0) {
                return false
            }

            const did_you_read_book = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "borrow",
                method: "count",
                query: {
                    filter: {
                        user: payload.body.user,
                        book: payload.body.book
                    }
                }
            })

            if (did_you_read_book.data > 0) {
                return false
            }
            return true
        }
    })

}