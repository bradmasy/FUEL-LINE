// homepage
// executed first when the serve is initiated

const express     = require("express");
const app         = express();
const path        = require("path");
const https       = require("https");
let session       = require ("express-session");
let sessionNumber = 0;
let userModel     = require("../scripts/userModel");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
let schema        = mongoose.schema;
let User          = require("./userModel");
let db            = mongoose.connection;

app.set('views', "../views/");
app.set("view engine","ejs");
app.set("signup","../views/signup.ejs");

let users = {
    "user1" :"pass1",
    "user2":"pass2"
}

app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("../public/"));
app.use("../public/styles/",express.static("../public/styles/"));
app.use("../public/images/",express.static("../public/images/"));
app.use("../public/scripts/",express.static("../public/scripts/"));


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Database Connection
 */

 mongoose.connect("mongodb://localhost:27017/Fuel_Line"); // our database on local host, not yet on server...


 db.once("open",function(){
     console.log("connection successful");
 })
 

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.listen(5000, (err) => {
    if(err) console.log(err);
})

/**
 * Routes
 */

app.get("/", function(req,res){ // homepage
    res.render("index");
})

app.get("/login", (req,res) => {

    res.render("login");
})

app.get("/signup", function(req,res){
    res.render("signup");
})

// app.get("/logout", (req,res) => {
    
//     db.connection.close();
//     if(db.connection.close == true)
//     {
//         console.log("bye bye");
//     }
// })

// routes


// app.get("/", (req,res,next) => {
//     if(req.session.authenticated) // this variable is associated with a session.
//     { 
//         res.send(`hi ${req.session.user}!`);
//     }
//     else{
//         res.redirect("/login");
//         res.send("not autrhenticated");

//     }
// });

// app.get("/login",(req,res,next) => {
//     res.send("cred in url");
// })

// app.get("/login/:user/:pass",(req,res,next) => {
//     if(users[req.params.user] == req.params.pass)
//     {
//         req.session.authenticated = true;
//         req.session.user = req.params.user;
//         res.redirect("/"); // bring them back to the home page
//     }
//     else{
//         req.session.authenticated = false;
//         res.send("Error");
//     }
// })












console.log("Server Running");