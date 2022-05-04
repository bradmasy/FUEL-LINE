/**
 * Defines the User Schema for the User.
 * 
 * @name: Bradley Masciotra
 * @version: 1.0
 * @copyright: Fuel Line Solutions Corp.
 */

let mongoose = require("mongoose");
let Schema   = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String
})


module.exports = mongoose.model("users", userSchema);