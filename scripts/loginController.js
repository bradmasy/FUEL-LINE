let fs = require('fs');
let path = require('path');
let User = require('../models/usersModel');

exports.getLoginPage = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let loginHtmlPath = path.join(__dirname, '..', 'views', 'login.html');

    fs.readFile(loginHtmlPath, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}
