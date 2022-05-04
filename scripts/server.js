// homepage
// executed first when the serve is initiated

const express = require("express");
const app     = express();
const path    = require("path");
const https   = require("https");

app.set('views', "../views/");
app.set("view engine","ejs");
app.set("signup","../views/signup.ejs");

app.listen(5000, (err) => {
    if(err) console.log(err);
})

/**
 * Routes
 */

app.get("/", function(req,res){ // homepage
    res.render("index");
})

app.get("/signup.ejs", function(req,res){
    console.log(req);
    res.render("signup");
})




/**getting the id from the url */

// app.get("/profile/:id",function(req,res){
//     let id = req.params.id; // ie /id=128 gets "128" 
// })


app.use(express.static("../public/"));
app.use("../public/styles/",express.static("../public/styles/"));
app.use("../public/images/",express.static("../public/images/"));
app.use("../public/scripts/",express.static("../public/scripts/"));


console.log("Server Running");