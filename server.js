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

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://loclhost/mongoHeadlines", { useNewUrlParser: true })

// creating  routes

app.get("/", (req,res)=>{
    db.Article.find({}, (err,data)=>{
        res.render("index")
    })
})

// GET route for scraping
app.get("/scrape", (req, res) => {
    axios.get("https://bleacherreport.com/world-football").then((response) => {
        // make cheerio $
        const $ = cheerio.load(response.data);

        // grabbing articles
        $("div.articleContent").each(function (i, element) {
            const result = {};

            result.title = $(this).children("a").children("h3").text();
            result.link = $(this).children("a.articleTitle").attr("href");
            result.summary = $(this).children("p.articleDescription").text();
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

// Show all articles
app.get("/articles", (req,res)=>{
    db.Article.find({})
    .then((dbArticle)=>{
        res.json(dbArticle);
    })
    .catch((err)=>{
        res.json(err);
    });
});

// route to grab a specific article by id

app.get("/articles/:id",(req,res)=>{
    db.Article.findOne({ _id: req.params.id }).populate("note").then((dbArticle)=>{
        res.json(dbArticle);
    }).catch((err)=>{
        res.json(err);
    });
});

// Update article's notes by id
app.post("/articles/:id",(req,res)=>{
    db.Note.create(req.body).then((dbNote)=>{
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then((dbArticle)=>{
        res.json(dbArticle);
    }).catch((err)=>{
        res.json(err);
    });
});


app.listen(PORT, () => {
    console.log("running at: http://localhost:" + PORT);
});