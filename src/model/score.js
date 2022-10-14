module.exports = async function (ctx) {
    await ctx.model({
        name: "score",
        database: "postgresql",
        schema: {
            book: {
                relation: "book",
                required: true,
                uniqueGroup: ["g1"]
            },
            user: {
                relation: "user",
                required: true,
                uniqueGroup: ["g1"]
            },
            score: {
                type: "number",
                required: true,
                max: 10,
                min: 0,

            },
        },
        lifecycle: {
            create: { rule: ["need_borrow"], role: ["system"] },
            read: { role: ["system"] },
            update: { role: ["system"] },
            delete: { role: ["system"] },
            count: { role: ["system"] },
        }
    })

    await ctx.lifecycle({
        name: "need_borrow",
        function: async function (payload, ctx, state) {
            return true
        }
    })
}