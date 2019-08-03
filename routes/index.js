var router = require("express").Router();
var articleRoutes = require("./article");
var scrapeRoutes = require("./scrape");

router.use("./scrape", scrapeRoutes);
router.use("./article", articleRoutes);


module.exports = router