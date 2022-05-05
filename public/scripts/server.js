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
const indexRoute  = require("../routes/index-routes");
const loginRoute  = require("../routes/login-routes");
const signupRoute = require("../routes/signup-routes");

app.set('views', "../views/");
app.set("view engine","ejs");
app.set("signup","../views/signup.ejs");

app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("../public"));
app.use("/", indexRoute);
app.use("/signup",signupRoute);
// app.use("/login",loginRoute);

app.use("/styles/",express.static("../styles/main.css"));
app.use("/images/",express.static("../public/images/"));
app.use("/scripts/",express.static("../public/scripts/"));


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Database Connection
 */


 
 mongoose.connect(
  "mongodb+srv://fuel_line_2022:fuel@cluster0.vcuj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//  mongoose.connect("mongodb://localhost:27017/Fuel_Line"); // our database on local host, not yet on server...

 db.once("open",function(){
     console.log("connection successful");
 })
 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.listen(5000, (err) => {
    if(err) console.log(err);
})


app.post("/api/user",(req,res) => {

  let saveUser = new userModel(req.body);
  saveUser.save((error,saveUser) => {
    if(error) throw error
    res.json(saveUser)
  })
})




// app.get("/", (req,res,next) => {
//     if(req.session.authenticated) // this variable is associated with a session.
//     { 
//         res.send(`hi ${req.session.user}!`);
//     }
//     else{
//         res.redirect("/login");
//         res.send("not autrhenticated");


/**getting the id from the url */

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


app.get("/login", (req,res) => {

  res.render("login");
})


app.post("/login", function (req, res) {
    console.log("req. has been received");
      
    userModel.find({
      $and: [
        { username: req.body.username },
        { password: req.body.password },
      ],
      
    },
    function (err, users) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + users);
      }
      res.send(users);
    }
    
    );

  });









console.log("Server Running");