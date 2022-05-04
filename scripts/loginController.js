// const res = require("express/lib/response");
let fs = require("fs");
let path = require("path");
let User = require("./userModel");
console.log(__dirname);

exports.getLoginPage = function(request, response){
    res.writeHead(200, {"Content-Type" : "text/html"});

    console.log(request);

    let loginHtmlPath = "../signup.html";
}