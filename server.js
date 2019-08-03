// express and mongoose
const express = require("express");
const mongoose = require("mongoose")
// port
const PORT = process.env.PORT || 3000;

// axios and cheerio - needed for scraping
const axios = require("axios");
const cheerio = require("cheerio");

// handlebars
const exphbs = require("express-handlebars");

// intialize express
const app = express();

// require all models
const db = require("./models")

// set static content as public
app.use(express.static("public"));

// Parse request as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to mongodb

mongoose.connect("mongodb://localhost/scrapingby", { useNewUrlParser: true });

// creating scraping routes

// GET route for scraping
app.get("/scrape", (req, res) => {
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
        })
    })
})
app.listen(PORT, () => {
    console.log("running at: http://localhost:" + PORT);
});