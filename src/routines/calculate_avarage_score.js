module.exports = async function (fookie) {
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
            console.log(`Book: ${book.name} Avarage: ${parseInt(avarage)}`);
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
                    avarage_score: parseInt(avarage)
                }
            })
        }
        console.log("calculating avarage score");
    }, 1000 * 30);

}