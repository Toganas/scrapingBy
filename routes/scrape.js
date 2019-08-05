var router = require("express").Router();

// GET route for scraping
router.get("/scrape", (req, res) => {
    axios.get("https://bleacherreport.com/world-football").then((response) => {
        // make cheerio $
        const $ = cheerio.load(response.data);

        // grabbing articles
        $("div.articleContent").each(function (i, element) {
            const result = {};

            result.title = $(this).children("a").children("h3").text();
            result.link = $(this).children("a.articleTitle").attr("href")
            console.log(result);

            // create new Article

            db.Article.create(result).then((dbArticle) => {
                console.log(dbArticle);
            })
                .catch((err) => {
                    console.log(err);
                });
        });
        res.send("Scrape Complete")
    })
});

module.exports = router