/**
 * Login Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

const $showPasswordBox   = $("#show-pass-box");
const $showPasswordTitle = $("#pass-label");
const $userPassword      = $("#password_log");
const $profileButton     = $("#profile");
const $signupButton      = $("#signup");
const $homeButton        = $("#home-button");
const DELAY              = 1000;
const TRANSITION_BACK    = 3000;
const USER               = 0;
const NO_USER            = 0;
let passwordVisible      = false;
let isAdmin              = false; 



/**
 * Turns function handlers on for show password.
 */
function showPassword()
{
  $showPasswordBox.on("click", () => 
  {
    if (!passwordVisible) {
      $showPasswordTitle.html("Hide Password");
      $userPassword.attr("type", "text");
      passwordVisible = true;
    }
    else {
      $showPasswordTitle.html("Show Password");
      $userPassword.attr("type", "password");
      passwordVisible = false;
    }
  })
}

/**
 * Checks to see if the user exists and displays the appropriate feedback to the screen based on validations.
 * 
 * @param {Array} data the user data sent back from the server, if empty a user does NOT exist.
 */
function checkUserExists(data) 
{
  if (data.length === NO_USER) 
  {
    $("#username_log").css("transition","2s");
    $("#username_log").css("background-color", "rgb(248, 106, 106)");
    $("#username_log").val("Incorrect Username and Password.");
    $("#password_log").css("transition","2s");
    $("#password_log").css("background-color", "rgb(248, 106, 106)");
    $("#password_log").attr("type","text");
    $("#password_log").val("Please Try Again.");

    setTimeout(() => 
    {
      $("#username_log").css("transition","2s");
      $("#username_log").css("background-color", "white");
      $("#username_log").val("");
      $("#password_log").css("transition","2s");
      $("#password_log").css("background-color", "white");
      $("#password_log").attr("type","password");
      $("#password_log").val("");
    }, TRANSITION_BACK); 
  }
  else if (data[USER].admin == true)
  {
    window.location.href = "/admin_user_views";
  }
  else 
  {
    $("#username_log").css("transition","2s");
    $("#username_log").css("background-color", "lightgreen");
    $("#username_log").val("Matched Username");
    $("#password_log").css("transition","2s");
    $("#password_log").css("background-color", "lightgreen");
    $("#password_log").attr("type","text");
    $("#password_log").val("Matched Password");

    setTimeout(() => 
    {
      window.location.href = "/success"; // delay the change to success so the user sees the feedback.
    }, DELAY);
  }
}

/**
 * Attempts to log a user into the application
 */
function attemptLogin() 
{
  $.ajax({
    url: "/attemptLogin",
    type: "POST",
    data: {
      username: $("#username_log").val(),
      password: $("#password_log").val(),
    },
 
    success: checkUserExists
   
  });
}

/**
 * Sets the page up.
 */
function setup() 
{
  $("#submit-button").on("click", attemptLogin);
  showPassword();

  $("#back-button").on("click", () => {
    window.location.href ="/";
  })


  let $topBars = $(".top-bar");

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 0) {
      $element.css("background-color", "#FF912C");
    }
  }
}

$(document).ready(setup);