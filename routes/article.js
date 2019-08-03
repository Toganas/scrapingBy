var router = require("express").Router();
var articleController = require("../controllers/Article.js")


// all articles
router.get("/articles", articleController.findAll);

// route to grab a specific article by id
router.get("/articles/:id", articleController.findOne);

// Update article's notes by id
router.post("/articles/:id", articleController.post);

module.exports = router