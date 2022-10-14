module.exports = async function (ctx) {
    await ctx.model({
        name: "book",
        database: "postgresql",
        schema: {
            name: {
                type: "string",
                required: true,
            },
            avarage_score: {
                type: "number",
                default: 0
            },
        },
        lifecycle: {
            create: { role: ["system"] },
            read: { role: ["system"] },
            update: { role: ["system"] },
            delete: { role: ["system"] },
            count: { role: ["system"] },
        }
    })
}