// express and mongojs
const express = require("express");
const mongojs = require("mongojs");
var PORT = process.env.PORT || 3000;

// axios and cheerio
const axios = require("axios");
const cheerio = require("cheerio");

// handlebars
const exphbs = require("express-handlebars");

const app = express();

// set static content as public
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");