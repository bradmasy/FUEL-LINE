/**
 * Login.js
 * 
 * 
 */

/*
 * Variables
 */

let passwordVisible = false;

/**
 * Displays submit message on successful login.
 * 
 * @param {Event} data 
 */
function proceedToHome(data) {
  console.log("successful login")
}

/**
 * Toggles the password visibility for the user.
 */
function showPassword() {
  $("#show-pass-box").on("click", () => {

    if (!passwordVisible) {
      $("#pass-label").html("Hide Password");
      $("#password_log").attr("type", "text");
      passwordVisible = true;
    }
    else {
      $("#pass-label").html("Show Password");
      $("#password_log").attr("type", "password");
      passwordVisible = false;
    }
  })
}

/**
 * 
 */
function attemptLogin() {
  console.log("attemptLogin" + "got called!");
  console.log($("#username_log").val());
  console.log($("#password_log").val());
  $.ajax({
    url: "http://localhost:5000/attemptLogin",
    //   url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
    type: "POST",
    data: {
      username: $("#username_log").val(),
      password: $("#password_log").val(),
    },
    success: proceedToHome,
  });
  // resetPage();
}



function setup() {
  console.log("login.js loaded")
  $("#submit-button").on("click", attemptLogin);
  showPassword();

}

$(document).ready(setup);