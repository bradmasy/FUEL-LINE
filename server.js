


// homepage
// executed first when the serve is initiated

const express = require("express");
const app = express();
app.set("view engine", "ejs");
const https = require("https");
const session  = require("express-session");
app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));

app.listen(process.env.PORT || 5000, function (err) {
  if (err) console.log(err);
});

const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");

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
  password: String,
  email: String,
  admin: Boolean,
});
const userModel = mongoose.model("users", userSchema);

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

app.use(express.static("./public"));

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
    alert("User not found");
  } else {
    return true;
    //proceedToHome();
  }
}


app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/public/success.html");
});


function initiateSession(req,users)
{
  if(checkUserExists(users)){
    req.session.authenticated = true; // user gets authenticated.
    req.session.user          = users; 
    console.log(`welcome ${users[0].username}`);
  }
  else
  {
    req.session.authenticated = false;
    console.log(`invalid user`);
  }
}

app.post("/attemptLogin", function (req, res) {
  console.log("req. has been received");
  console.log(req.body);
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
  console.log("req. has been received");
  console.log("attemptSignup called in server");
  userModel.insertMany({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    admin: req.body.admin
  }, function (err, users) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + users);
    }
    res.send(users);
  });
});


app.get("/logout", (req,res) => {
  console.log("req made");
  res.sendFile(__dirname + "/public/logout.html");

  if(req.session){
    delete req.session;
    // req.session.destroy((err) => {
    //  // res.status(400).send("Unable to log out")
    // });
  }
  else {
    console.log("logged out");
  }
})

// // homepage
// // executed first when the serve is initiated

// const express    = require("express");
// const app        = express();
// const https      = require("https");
// const bodyparser = require("body-parser");
// const mongoose   = require("mongoose");
// const session    = require("express-session");
// const res = require("express/lib/response");
// app.use(express.urlencoded({extended:false}));

// app.set("view engine", "ejs");
// //process.env.PORT ||
// app.listen( 4000, function (err) {
//   if (err) console.log(err);
// });

// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );

// app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));

// mongoose.connect(
//   "mongodb+srv://fuel_line_2022:fuel@cluster0.vcuj9.mongodb.net/FuelLineDTC12?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// //  mongoose.connect("mongodb://localhost:27017/Fuel_Line"); // our database on local host, not yet on server...

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   email: String,
//   admin: Boolean,
// });
// const userModel = mongoose.model("users", userSchema);

// /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// app.get("/login", function (req, res) {
//   res.render("login");
// });

// function checkUserExists(data) {
 
//   let valid = true;

//   if (data.length === 0) {
//     valid = false;
//   } 

//   return valid;
// }

// function initiateSession(req,users)
// {
//   if(checkUserExists(users)){
//     req.session.authenticated = true; // user gets authenticated.
//     req.session.user          = users; 
//     console.log(`welcome ${users[0].username}`);
    
//   }
//   else
//   {
//     req.session.authenticated = false;
//     console.log(`invalid user`);
//   }
// }

// app.get("/attemptLogin",(req,res) =>{
// })

// app.get("/logout.html", (req,res) => {
//   console.log("req made");
//   if(req.session){
//     req.session.destroy((err) => {
//       res.status(400).send("Unable to log out")
//     });
//   }
//   else {
//     console.log("logged out");
//   }
// })

// app.post("/attemptLogin", function (req, res) {
//   console.log("req. has been received");
  
//   // res.redirect("/attemptLogin");
//   //console.log("this far");
//   // userModel.find(
//   //   {
//   //     $and: [{ username: req.body.username }, { password: req.body.password }],
//   //   },
//   //   function (err, users) {
//   //     if (err) 
//   //     {
//   //       console.log("Error " + err);
//   //       req.session.authenticated = false; // user gets authenticated.
//   //       console.log("FAIL");
//   //     } 
//   //     else 
//   //     {
//   //       initiateSession(req, users);    
//   //     }
//   //   }
//   // );
// });


// /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// /**
//  * Database Connection
//  */

//  app.post("/displayUsersToAdmin", function (req, res) {
//   console.log("req. has been recieved");
//   console.log(req.body.username);

//   userModel.find({ name: req.body.username }, function (err, users) {
//     if (err) {
//       console.log("Error " + err);
//     } else {
//       console.log("Data " + users);
//     }
//     res.send(users);
//   });
// });
// app.get("/login", function (req, res) {
//   res.sendFile(__dirname + "/public/login.html");
// });

// app.post("/attemptSignup", function (req, res) {
//   console.log("req. has been received");
//   console.log("attemptSignup called in server");
//   userModel.insertMany({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//     admin: req.body.admin
//   }, function (err, users) {
//     if (err) {
//       console.log("Error " + err);
//     } else {
//       console.log("Data " + users);
//     }
//     res.send(users);
//   });
// });

// console.log("Server Running");
// app.use(express.static("./public"));


console.log("Server Running");
