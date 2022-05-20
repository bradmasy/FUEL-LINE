// homepage
// executed first when the serve is initiated
const express = require("express");
var cors = require("cors");
var convert = require("xml-js");
const app = express();
const https = require("https");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const USER = 0;

app.use(cors());
app.use(session({ secret: "shhhh", saveUninitialized: true, resave: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 5000, function (err) {
  if (err) console.log(err);
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://fuel_line_2022:fuel@cluster0.vcuj9.mongodb.net/FuelLineDTC12?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/**
 * Schema for user.
 */
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  admin: Boolean,
  trips: [Object],
  vehicle_efficiency: Number,
});

const userModel = mongoose.model("users", userSchema);

app.get("/statistics", (req, res) => {
  res.render("statistics");
});

app.post("/create-trip", (req, res) => {
  let origin = req.body.origin;
  let destination = req.body.destination;
  let distance = req.body.distance;
  let user_id = req.session.user._id;
  let date = req.body.date;
  let time = req.body.time;
  let cost = req.body.cost;

  userModel.findOneAndUpdate(
    {
      _id: user_id,
    },
    {
      $push: {
        trips: {
          origin: origin,
          destination: destination,
          distance: distance,
          date: date,
          time: time,
          cost: cost,
        },
      },
    },
    (err, data) => {
      console.log(data);
    }
  );
});

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
  } else {
    return true;
  }
}

app.get("/", function (req, res) {
  if (req.session.authenticated == true) {
    res.render("dashboard");
  } else {
    res.render("index");
  }
});

app.get("/index", function (req, res) {
  if (req.session.authenticated == true) {
    res.redirect("dashboard");
  } else {
    res.render("index");
  }
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/car-choice", function (req, res) {
  res.render("car-choice");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/success", function (req, res) {
  res.render("success");
});

app.get("/profile", function (req, res) {
  if (req.session.authenticated) {
    res.render("profile");
  } else {
    res.redirect("login"); // redirect if not already logged in.
  }
});

app.get("/admin_user_views", function (req, res) {
  res.render("admin_user_views");
});

app.get("/userinput", function (req, res) {
  res.render("user_input");
});

app.get("/dashboard", function (req, res) {
  if (req.session.authenticated) {
    res.render("dashboard");
  } else {
    res.redirect("login");
  }
});

app.get("/map", function (req, res) {
  res.render("map-copy-styles");
});

function initiateSession(req, users) {
  //initiates a session
  if (checkUserExists(users)) {
    req.session.authenticated = true; // user gets authenticated.
    req.session.user = users[USER];
    console.log(req.session.user);
  } else {
    req.session.authenticated = false;
    console.log(`invalid user`);
  }
}

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
    return false;
  } else {
    currentUser = data;
    return true;
    //proceedToHome();
  }
}

app.post("/attemptLogin", function (req, res) {
  //checks if entered information matches an existing user in database

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

  userModel.insertMany(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      admin: req.body.admin,
      trips: [],
    },
    function (err, users) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + users);
        initiateSession(req, users);
      }
      res.send(users);
    }
  );
});

app.get("/logout", (req, res) => {
  // logs the user out of session

  if (req.session.authenticated) {
    req.session.authenticated = false;
    console.log('here')
    delete req.session;
    res.render("index");
  } else {
    res.render("404");
  }
});

app.get("/getUserInfo", function (req, res) {
  //sends the current session user info to the client
  if (req.session.user == 0) {
    res.render("index");
  } else {
    userModel.find(
      { username: req.session.user["username"] },
      function (err, users) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Data " + users);
        }
        console.log(users);
        res.send(users[0]);
      }
    );
  }
});

app.get("/user-data", (req, res) => {
  req.header("Content-Type", "application/json");
  userModel.find(
    { username: req.session.user["username"] },
    function (err, users) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + users);
      }
      console.log(users);
      let data = {
        username: users[0].username,
        trips: users[0].trips,
      };
      // res.send(users[0]);
      res.send(JSON.stringify(data));
    }
  );
});

app.post("/saveUserVehicle", function (req, res) {
  //adds user to users database
  console.log("req. has been received");
  console.log("saveUserVehicle called in server");

  console.log(req.session.user._id);
  let user_id = req.session.user._id;
  // console.log(user_id)

  userModel.findOneAndUpdate(
    {
      _id: user_id,
    },
    {
      vehicle_efficiency: req.body.vehicle,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
  res.send("success");
});

console.log("Server Running");
app.use(express.static("./public"));
