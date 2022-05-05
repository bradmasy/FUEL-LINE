const express    = require("express");
const app        = express();
const path       = require("path");
const https      = require("https");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
let schema       = mongoose.schema;
let User         = require("./userModel");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Fuel_Line");

let db = mongoose.connection;

db.once("open",function(){
    console.log("connection successful");
})


//let user = new User({username:"", password:""});

// user.save(function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("user is saved");
//     }
// })

















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