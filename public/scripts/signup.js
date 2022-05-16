/**
 * signup.JS for the signup page
 */

/**
 * Constant Variables
 */

const $backButton = $("#back-button");
const $confirmButton = $("#confirm-button");
const $confirmPassword = $("#password2");
const $userPassword = $("#password1");
const $showPasswordBox = $("#show");
const $showPasswordTitle = $("#pass-title");


/**
 * Let Variables
 */

let passwordVisible = false; // for revealing the password.

/**
 * Functions
 */

/**
 * Event Handlers
 */

$backButton.on("click", () => {
  window.location.href = "/";
});



/**
 * Turns function handlers on for show password.
 */
function showPassword() {
  $showPasswordBox.on("click", () => {

    if (!passwordVisible) {
      $showPasswordTitle.html("Hide Password");
      $userPassword.attr("type", "text");
      $confirmPassword.attr("type", "text");
      passwordVisible = true;
    }
    else {
      $showPasswordTitle.html("Show Password");
      $userPassword.attr("type", "password");
      $confirmPassword.attr("type", "password");
      passwordVisible = false;
    }
  })
}

function proceedToHome() {
  console.log("successful Signup");
  window.location.href = "/success";
}

function checkUserExists(data) {
  if (data.length === 0) {
    console.log("User not found!");
    alert("User not found");
  } else {
    proceedToHome();
  }
}

function attemptSignup() {
  console.log("attemptSignup" + "got called!");
  let username = $("#username").val();
  let email = $("#email").val();
  let origPassword = $("#password1").val();
  let passwordCopy = $("#password2").val();


  if (passTests(username, origPassword, email, passwordCopy))
   {
      adminIsChecked = false;
      if ($("#admin-status").is(":checked")) adminIsChecked = true;

      $.ajax({
        url: "/attemptSignup",
        type: "POST",
        data: {
          username: $("#username").val(),
          email: $("#email").val(),
          password: $("#password1").val(),
          admin: adminIsChecked
        },
        success: checkUserExists,
      });
  }
  else 
  {
    console.log("FAILED");
  }


}

function setup() {


  let $topBars = $(".top-bar");

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 0) {
      $element.css("background-color", "black");

    }

  }

  showPassword();
  $("#confirm-button").on("click", attemptSignup);
}

$(document).ready(setup);
