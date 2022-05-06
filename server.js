// homepage
// executed first when the serve is initiated

const express    = require("express");
const app        = express();
const https      = require("https");
const bodyparser = require("body-parser");
const mongoose   = require("mongoose");
const session    = require("express-session");
const { use } = require("express/lib/application");
const res = require("express/lib/response");

app.set("view engine", "ejs");

app.listen(process.env.PORT || 5000, function (err) {
  if (err) console.log(err);
});

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));

mongoose.connect(
  "mongodb+srv://fuel_line_2022:fuel@cluster0.vcuj9.mongodb.net/FuelLineDTC12?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//  mongoose.connect("mongodb://localhost:27017/Fuel_Line"); // our database on local host, not yet on server...

  const userSchema = new mongoose.Schema({
    username: String,
    passwordt: String,
  });
  const userModel = mongoose.model("users", userSchema);
 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

function checkUserExists(data) {
 
  let valid = true;

  if (data.length === 0) {
    valid = false;
  } 

  return valid;
}

function initiateSession(req,users)
{
  if(checkUserExists(users)){
    req.session.authenticated = true; // user gets authenticated.
    req.session.user          = users; 
    console.log(`welcome ${users[0].username}`);

    // res.redirect("/public/index.html");
    
  }
  else
  {
    req.session.authenticated = false;
    console.log(`invalid user`);
  }
}

app.use(express.static("./public"));

app.post("/attemptLogin", function (req, res) {
  console.log("req. has been received");
  
  userModel.find(
    {
      $and: [{ username: req.body.username }, { password: req.body.password }],
    },
    function (err, users) {
      if (err) 
      {
        console.log("Error " + err);
        req.session.authenticated = false; // user gets authenticated.
        console.log("FAIL");
      } 
      else 
      {
        initiateSession(req, users);    
      }
    }
  );
});


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Database Connection
 */

 app.post("/displayUsersToAdmin", function (req, res) {
  console.log("req. has been recieved");
  console.log(req.body.username);

  userModel.find({ name: req.body.username }, function (err, users) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + users);
    }
    res.send(users);
  });
});

console.log("Server Running");

