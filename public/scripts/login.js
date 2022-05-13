/**
 * Constant Variables
 */
const $showAdminBox      = $("#admin-check");
const $showPasswordBox   = $("#show-pass-box");
const $showPasswordTitle = $("#pass-label");
const $userPassword      = $("#password_log");

/**
 * Let Variables
 */
let passwordVisible = false; // for revealing the password.
let isAdmin = false; // for enabling admin login



/**
 * Turns function handlers on for admin.
 */
 function adminLogin()
 {
     $showAdminBox.on("click",() => {
 
         if(!isAdmin)
         {
            isAdmin = true;
         }
         else
         {
             isAdmin = false;
         }
     })
 }

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
             passwordVisible = true;
         }
         else
         {
             $showPasswordTitle.html("Show Password");
             $userPassword.attr("type","password");
             passwordVisible = false;
         }
     })
 }


function checkUserExists(data) {
  console.log(data);
  console.log(data[0].admin)
  if (data.length === 0) {
    console.log("User not found!");
    alert("User not found");
  } 
  if (data[0].admin == true) {
    console.log("admin login")
    window.location.href ="/admin_user_views"
  }
  else {
    window.location.href ="/success"
  }
}

function attemptLogin() {
    console.log("attemptLogin" + "got called!");
    console.log($("#username_log").val());
    console.log($("#password_log").val());
    $.ajax({
      url: "/attemptLogin",
    type: "POST",
    data: {
      username: $("#username_log").val(),
      password: $("#password_log").val(),
    },
    success: checkUserExists,
  });
  // resetPage();
}

function setup() {
    console.log("login.js loaded")
    $("#submit-button").on("click", attemptLogin);
    showPassword();
    adminLogin();
  }
  
  $(document).ready(setup);
