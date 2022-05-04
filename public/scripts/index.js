// const express    = require("express");
// const app        = express();
// const mongoose   = require("mongoose");
// const bodyParser = require("body-parser");
// let schema       = mongoose.schema;
// let USER         = require("./userModel");
// const { $where } = require("./userModel");

// const { createPublicKey } = require("crypto");

// app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));


// mongoose.connect("mongodb://localhost:27017/Fuel_Line");

// let db = mongoose.connection;

// db.once("open",function(){
//     console.log("connection successful");
// })


// let user = new USER({username:"ken",password:"password"});

// user.save(function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("user is saved");
//     }
// })



const $signupButton = $("#signup");
const $homeButton = $("#home-button");

$signupButton.mouseleave(function(){
  
})

$signupButton.click( function(){
    // window.location.href = "../signup.html"
})

$homeButton.on("click", function(){
    window.location.href = "../index.html"
})


console.log($signupButton);

function setup()
{
    console.log("document ready");
}

$(document).ready(setup);