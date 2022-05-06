// homepage
// executed first when the serve is initiated

const express = require("express");
const app = express();
app.set("view engine", "ejs");
const https = require("https");

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
  passwordt: String,
});
const userModel = mongoose.model("users", userSchema);

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

// app.get("/profile/:id", function (req, res) {
//   // console.log(req);

//   const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;

//   data = " ";
//   https.get(url, function (https_res) {
//     https_res.on("data", function (chunk) {
//       data += chunk;
//     });

//     https_res.on("end", function () {
//       // console.log(JSON.parse(data))
//       data = JSON.parse(data);

//       // console.log(data)

//       tmp = data.stats
//         .filter((obj_) => {
//           return obj_.stat.name == "hp";
//         })
//         .map((obj_2) => {
//           return obj_2.base_stat;
//         });

//       res.render("profile.ejs", {
//         id: req.params.id,
//         name: data.name,
//         hp: tmp[0],
//       });
//     });
//   });
// });

app.use(express.static("./public"));

app.post("/attemptLogin", function (req, res) {
  console.log("req. has been received");
  console.log(req.body);
  userModel.find(
    {
      $and: [{ username: req.body.username }, { password: req.body.password }],
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Database Connection
 */

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
