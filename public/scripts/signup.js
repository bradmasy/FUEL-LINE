/**
 * signup.JS for the signup page
 */

/**
 * Constant Variables
 */

const $backButton        = $("#back-button");
const $confirmButton     = $("#confirm-button");
const $userPassword      = $("#user-pass");
const $confirmPassword   = $("#confirm-pass");
const $showPasswordBox   = $("#show");
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
  window.location.href = "../index.html";
});



/**
 * Turns function handlers on for show password.
 */
function showPassword()
{
    $showPasswordBox.on("click",() => {

        if(!passwordVisible)
        {
            $showPasswordTitle.html("Hide Password");
            $userPassword.attr("type","text");
            $confirmPassword.attr("type","text");
            passwordVisible = true;
        }
        else
        {
            $showPasswordTitle.html("Show Password");
            $userPassword.attr("type","password");
            $confirmPassword.attr("type","password");
            passwordVisible = false;
        }
    })
}

function proceedToHome() {
  console.log("successful Signup");
  window.location.href = "/success.html";
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
  console.log($("#username").val());
  console.log($("#email").val());
  console.log($("#password1").val());
  console.log($("#password2").val());

  adminIsChecked = false;
  if ($("#admin-status").is(":checked")) adminIsChecked = true;


  if ($("#password1").val() === $("#password2").val()) {
    $.ajax({
      url: "http://localhost:5000/attemptSignup",
      //   url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
      type: "POST",
      data: {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password1").val(),
        admin: adminIsChecked
      },
      success: checkUserExists,
    });
    // resetPage();
  } else {
    alert("passwords do not match");
  }
}

function setup() {
  console.log("document ready");
  showPassword();
  $confirmButton.on("click", attemptSignup);
}

$(document).ready(setup);
