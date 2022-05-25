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
let imageFiles;
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

function displayPopup() {
  $(".error").fadeIn();
}

function closePopup() {
  $(".error").fadeOut();
}





function attemptSignup() {
  let username     = $("#username").val();
  let email        = $("#email").val();
  let origPassword = $("#password1").val();
  let passwordCopy = $("#password2").val();
  let imgString    = $("#img-string").val();
  let id           = `${username.slice(0, 2)}${origPassword.slice(3, 6)}`;


  const fileFormData = new FormData();
  fileFormData.append("file", imageFiles);

  fetch("/upload",{
    method:"POST",
    body: fileFormData
  }).then((response) => {
    console.log(response);
  });

 
  if (passTests(username, origPassword, email, passwordCopy)) {
    adminIsChecked = false;
    if ($("#admin-status").is(":checked")) adminIsChecked = true;

    $.ajax({
      url: "/attemptSignup",
      type: "POST",
      data: {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password1").val(),
        admin: adminIsChecked,
        image:fileFormData
      },

      success: checkUserExists,

    });
  }
  else {
    displayPopup()
    console.log("FAILED");
  }


} 

function setup() {

  

  let $topBars = $(".top-bar");

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 0) {
      $element.css("background-color", "#FF912C");
    }


    $(".close-button").on("click", closePopup)

    showPassword();
    $("#confirm-button").on("click", attemptSignup);
  }


  $("#prof-img-button").on("click", () => {
    $("#img-string").trigger("click");
    $("#img-string").on("change", (e) => {
    
      console.log(e);
      imageFiles = e.target.files[0];
      console.log(imageFiles);

    })
  })
}




//----------------------------------------------------------------------

//----------------------------------------------------------------------

  $(document).ready(setup);
