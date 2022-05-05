// const express     = require("express");
// const app         = express();
// let session       = require ("express-session");
// let sessionNumber = 0;
// let userModel     = require("../scripts/userModel");

// app.use(session({secret:"shhhh", saveUninitialized:true, resave:true}));

// app.listen(5000, (err) => {
//     if(err) console.log(err);
// })



// let users = {
//     "user1" :"pass1",
//     "user2":"pass2"
// }

// // routes
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

// console.log("Server Running");