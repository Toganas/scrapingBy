var db = require("../models")

module.exports = {
    // find all articles
    findAll: function (req, res) {
        db.Article.find({})
            .then((dbArticle) => {
                res.json(dbArticle);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    // find one article
    findOne: function (req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("note").then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            res.json(err);
        });
    },

    // post a new Note
    post: function (req, res) {
        db.Note.create(req.body).then((dbNote) => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            res.json(err);
        });
    }

};
// // Show all articles
// router.get("/articles", (req, res) => {
//     db.Article.find({})
//         .then((dbArticle) => {
//             res.json(dbArticle);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// });


// router.get("/articles/:id", (req, res) => {
//     db.Article.findOne({ _id: req.params.id }).populate("note").then((dbArticle) => {
//         res.json(dbArticle);
//     }).catch((err) => {
//         res.json(err);
//     });
// });

// Update article's notes by id
// router.post("/articles/:id", (req, res) => {
//     db.Note.create(req.body).then((dbNote) => {
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     }).then((dbArticle) => {
//         res.json(dbArticle);
//     }).catch((err) => {
//         res.json(err);
//     });
// });

// module.exports