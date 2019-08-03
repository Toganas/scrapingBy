// require mongoose
const mongoose = require("mongoose");

// save schema
const Schema = mongoose.Schema;

// create new Article Schema

const ArticleSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create the model above
const Article = mongoose.model("Article", ArticleSchema)

// Export module
module.exports = Article;