// homepage
// executed first when the serve is initiated
const express    = require("express");
var cors         = require('cors')
const app        = express();
const https      = require("https");
const session    = require("express-session");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors())
app.use(session({ secret: "shhhh", saveUninitialized: true, resave: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 5001, function (err) {
  if (err) console.log(err);
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(
  "mongodb+srv://fuel_line_2022:fuel@cluster0.vcuj9.mongodb.net/FuelLineDTC12?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  admin: Boolean,
  trips: [Object]
});

const userModel = mongoose.model("users", userSchema);



app.get("/statistics", (req, res) => {
  res.render("statistics");
})

app.post("/create-trip", (req, res) => {
  let origin      = req.body.origin;
  let destination = req.body.destination;
  let distance    = req.body.distance;
  let user_id     = req.session.user._id;
  let time        = req.body.time;
  let date        = req.body.date;

  userModel.findOneAndUpdate(
    {
      _id: user_id
    },
    {
      $push: {
        trips: {
          "origin":      origin,
          "destination": destination,
          "distance":    distance,
          "date":        date,
          "time":        time
        }
      }
    }, (err, data) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(data)
      }
    })
})

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
  } else {
    return true;
    //proceedToHome();
  }
}

app.get("/", function (req, res) {
  console.log(req.session.authenticated)
  if(req.session.authenticated == true)
  {
    res.render("dashboard");
  }
  else{
    res.render("index");
  }
});

app.get("/index", function (req, res) {
  console.log(req.session.authenticated)
  if(req.session.authenticated == true)
  {
    res.render("dashboard");
  }
  else{
    res.render("index");
  }
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/success", function (req, res) {
  console.log("success");
  res.render("success");
});

app.get("/profile", function (req, res) {
  res.render("profile");
})

app.get("/admin_user_views", function (req, res) {
  res.render("admin_user_views");
})

// app.get("/logout", function(req,res){
//   res.render("logout");
// })

app.get("/dashboard", function (req, res) {
  res.render("dashboard");
})

app.get("/map", function (req, res) {
  res.render("map-copy-styles");
})

function initiateSession(req, users)
{
  if (checkUserExists(users)) {
    req.session.authenticated = true; // user gets authenticated.
    req.session.user = users[0];

    console.log(`welcome ${users[0].username}`);
  }
  else {
    req.session.authenticated = false;
    console.log(`invalid user`);
  }
}

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
    return false
  } else {
    currentUser = data;
    return true;
  }
}

app.post("/attemptLogin", function (req, res) {
  userModel.find(
    {
      $and: [{ username: req.body.username }, { password: req.body.password }],
    },
    function (err, users) {
      if (err) {
        req.session.authenticated = false; // user gets authenticated.
      } else {
        initiateSession(req, users);
      }
      res.send(users);
    }
  );
});

app.post("/displayUsersToAdmin", function (req, res) {
  //sends all users in database
  console.log("req. has been recieved");
  userModel.find({}, function (err, users) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + users);
    }
    res.send(users);
  });
});

app.post("/attemptSignup", function (req, res) {
  //adds user to users database
  console.log("req. has been received");
  console.log("attemptSignup called in server");

  userModel.insertMany({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    admin: req.body.admin,
    // trips: []
  }, function (err, users) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + users);
    }
    res.send(users);
  });
});

//editing user profile 
app.post("/editUser", function(req, res){
  //updates user info
  console.log("req. has been received");
  console.log("editUser called in server");

  userModel.updateMany({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    admin: req.body.admin,

  }, function (err, users) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + users);
    }
    res.send(users);
  });
})

app.get("/logout", (req, res) => {
  // logs the user out of session
  console.log("req made");
  res.sendFile(__dirname + "/public/logout.html");

  if (req.session) {
    delete req.session;
    console.log("logged out");
    res.render("index");
    // req.session.destroy((err) => {
    //  // res.status(400).send("Unable to log out")
    // });
  }
  else {
    res.render("index");
  }
})

app.get("/getUserInfo", function (req, res) {
  //sends the current session user info to the client
  if (req.session.user == 0) {
    res.render("index")
  }
  else {
    res.send(req.session.user)
  }
});

app.get("/dashboard", function (req, res) {
  //sends the current session user info to the client
  if (req.session.user == 1) {
    res.render("dashboard")
  }
  else {
    res.send(req.session.user)
  }
});

app.get("/user-data", (req,res) => {
  console.log("request made");

  // console.log(req.session.user);
  // userModel.find({
  //   _id: req.session.user.id
  // },{})
  console.log(req.session.user.trips);
  req.header("Content-Type","application/json")

  let data = {
    username:req.session.user.username,
    trips: req.session.user.trips
    
  }
  res.send(JSON.stringify(data));
  
})

console.log("Server Running");
app.use(express.static("./public"));
