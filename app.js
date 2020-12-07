const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(BodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs")


app.get("/", (req, res)=>{
    res.render("Home")
})
app.listen(3000, (req, res)=>{
    console.log("app running on Port 3000")
})