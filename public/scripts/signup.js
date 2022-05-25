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

/**
 * Resets the element back to original values and stylings.
 * 
 * @param {DOM Element} element represents a DOM element we are altering.
 * @param {String} oldType      a string that represents the original type attribute of the element.
 */
function resetDiv(element,oldType)
{
  
  setTimeout(() => {
    element.fadeIn("slow", () => {
      element.css("transition", "3s");
      element.css("background-color", "white");


      if (oldType == "password") {
        element.attr("type", "password");
        element.val("")
      }
      else {
        element.val("")
      }

    })
  }, 3000)
}
/**
 * Displays error messages and changes the DOM element a red color to display errors have been made in the user input. 
 * Resets inputs to allow user to try again.
 * 
 * @param {DOM Element} element 
 * @param {String} message 
 */
function errorInputs(element, message) {
  element.css("transition", "3s");
  element.css("background-color", "rgb(248, 106, 106)");
  let oldType = element.attr("type");

  if (element.attr("type") == "password") {
    element.attr("type", "text");
    element.val(message);
  }
  else {
    element.val(message)
  }

  resetDiv(element,oldType);

}

/**
 * Changes dom element a green color to signify a successful parameter has been passed.
 * 
 * @param {DOM Element} element 
 */
function successHighlight(element) {
  element.css("transition", "3s");
  element.css("background-color", "lightgreen");
}

/**
 * Throws error messages or success messages dependent on if the input is valid.
 * 
 * @param {String} username the username entered by the user. 
 * @param {Boolean} valid   representing the current status of "valid" in the function.
 * @returns a boolean representing if the content has passed the validations.
 */
function usernameDisplays(username,valid)
{
  if (!validateUsername(username)) {
    errorInputs($("#username"), "Username Must Be Min 5 Characters");
    valid = false;
  }
  else {
    successHighlight($("#username"));
    valid = true
  }
  return valid;
}

/**
 * Throws error messages or success messages dependent on if the input is valid.
 * 
 * @param {String} email the email entered by the user. 
 * @param {Boolean} valid   representing the current status of "valid" in the function.
 * @returns a boolean representing if the content has passed the validations.
 */
function emailDisplays(email,valid)
{
  if (!validateEmail(email)) {
    errorInputs($("#email"), "Invalid Email Address");
    valid = false;

  }
  else {
    successHighlight($("#email"));
    valid = true
  }
  return valid;
}

/**
 * Throws error or success messages dependent on if the input is valid and the passwords are the same.
 * 
 * @param {String} origPassword the original password entered
 * @param {String} passwordCopy the confirmation password entered
 * @param {Boolean} valid  representing the current status of "valid" in the function.
 * @returns a boolean representing if the content has passed the validations.
 */
function passwordDisplays(origPassword,passwordCopy,valid)
{
  
  if (!validatePassword(origPassword)) {
    errorInputs($("#password1"), "Invalid Password");
    errorInputs($("#password2"), "Invalid Password");
     valid = false;

  }
  else {
    successHighlight($("#password1"));
    if (!samePassword(origPassword, passwordCopy)) {
      errorInputs($("#password2"), "Passwords Do Not Match");
      valid = false;

    }
    else {
      successHighlight($("#password2"));
      valid = true
    }
  }
  return valid;
}

/**
 * 
 * @param {String} username 
 * @param {String} email 
 * @param {String} origPassword 
 * @param {String} passwordCopy 
 * @returns 
 */
function displayInformativeFeedback(username,email,origPassword,passwordCopy)
{
  let valid = false;
  valid     = usernameDisplays(username,valid);
  valid     = emailDisplays(email,valid);
  valid     = passwordDisplays(origPassword,passwordCopy,valid)

  return valid;
}

function successfulProfilePictureUpload()
{

  $("#profile-picture").on("change", () => {
    console.log("success")
    $("#input-submit").css("transition","2s");
    $("#input-submit").css("background-color","lightgreen");
    $("#input-submit").attr("value","Successful");

  })
}

/**
 * Attempts to sign a user up to the application.
 */
function attemptSignup() {
  let username     = $("#username").val();
  let email        = $("#email").val();
  let origPassword = $("#password1").val();
  let passwordCopy = $("#password2").val();
  let valid        = displayInformativeFeedback(username,email,origPassword,passwordCopy);

  if (valid) {
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
}

/**
 * Sets up the page.
 */
function setup() {


  let $topBars = $(".top-bar");

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 0) {
      $element.css("background-color", "#FF912C");
    }
  }

  showPassword();
  $("#confirm-button").on("click", attemptSignup);

  $("#choose-button").on("click", () => {
    $("#profile-picture").trigger("click");
    successfulProfilePictureUpload();
  })
}


$(document).ready(setup);
