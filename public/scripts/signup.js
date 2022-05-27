/**
 * Signup Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */


const $backButton        = $("#back-button");
const $confirmButton     = $("#confirm-button");
const $confirmPassword   = $("#password2");
const $userPassword      = $("#password1");
const $showPasswordBox   = $("#show");
const $showPasswordTitle = $("#pass-title");
const DELAY              = 4000; // milliseconds.
const CHANGE_BACK_DELAY  = 3000; // milliseconds.
const SUBMIT_DELAY       = 5000; // milliseconds.
const NO_USER            = 0;
let passwordVisible      = false; // for revealing the password.


/**
 * Turns function handlers on for show password.
 */
function showPassword() {
  $showPasswordBox.on("click", () => {

    if (!passwordVisible) 
    {
      $showPasswordTitle.html("Hide Password");
      $userPassword.attr("type", "text");
      $confirmPassword.attr("type", "text");

      passwordVisible = true;
    }
    else 
    {
      $showPasswordTitle.html("Show Password");
      $userPassword.attr("type", "password");
      $confirmPassword.attr("type", "password");

      passwordVisible = false;
    }
  })
}

/**
 * Sends the user to the success page.
 */
function proceedToHome()
{
  window.location.href = "/success";
}

/**
 * Checks lenght of user data array, if empty, a user does not exist.
 * 
 * @param {Array} data an array of users.
 */
function checkUserExists(data) {
  if (data.length === NO_USER) {
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
  
  setTimeout(() => 
  {
    element.fadeIn("slow", () =>
     {
      element.css("transition", "3s");
      element.css("background-color", "white");

      if (oldType == "password") {
        element.attr("type", "password");
        element.val("")
      }
      else 
      {
        element.val("")
      }

    })
  }, CHANGE_BACK_DELAY)
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
  if (!validatePassword(origPassword))
  {
    errorInputs($("#password1"), "Invalid Password");
    errorInputs($("#password2"), "Invalid Password");
     valid = false;
  }
  else 
  {
    successHighlight($("#password1"));
    if (!samePassword(origPassword, passwordCopy)) 
    {
      errorInputs($("#password2"), "Passwords Do Not Match");
      valid = false;
    }
    else 
    {
      successHighlight($("#password2"));
      valid = true
    }
  }
  return valid;
}

/**
 * Shows the user informative feedback throughout their signup form as they enter inputs that either valid or invalid
 * 
 * @param {String} username     the username input value.
 * @param {String} email        the email input value.
 * @param {String} origPassword the first password value.
 * @param {String} passwordCopy the confirmed password value.
 * 
 * @returns a boolean representing whether the form data entered has been validated or deemed invalid.
 */
function displayInformativeFeedback(username,email,origPassword,passwordCopy)
{
  let valid         = false;
  let usernameValid = usernameDisplays(username,valid);
  let emailValid    = emailDisplays(email,valid);
  let passwordValid = passwordDisplays(origPassword,passwordCopy,valid)

  // check to see if any throw an error.
  if(!usernameValid||emailValid||passwordValid)
  {
    $("#confirm-button").off("click");
      console.log("off")
      setTimeout(()=>{
        $("#confirm-button").on("click",attemptSignup);
    
      }, SUBMIT_DELAY);

  }

  // if all are valid return true.
  if(usernameValid && emailValid && passwordValid)
  {
    valid = true;
  }

  

  return valid;
}

/**
 * Offers the user informative feedback on a successful upload of the profile image.
 */
function successfulProfilePictureUpload()
{
  $("#profile-picture").on("change", () => {
    $("#choose-button").css("transition","2s");
    $("#choose-button").html("Please Upload Picture");
    $("#choose-button").css("background-color","lightgreen");
    $("#input-submit").fadeIn("slow");
    $("#input-submit").css("display","flex");


    $("#input-submit").one("click",(e) => {
     
      $("#input-submit").css("background-color","lightgreen");

    })


    // $("#input-submit").css("background-color","lightgreen");
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

  
  if (valid) 
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

  $backButton.on("click", () => {
    window.location.href = "/";
  });

  $("#profile-pic-form")
  
}

$(document).ready(setup);