/**
 * Constant Variables
 */
const $showAdminBox      = $("#admin-check");
const $showPasswordBox   = $("#show-pass-box");
const $showPasswordTitle = $("#pass-label");
const $userPassword      = $("#password_log");
const $profileButton     = $("#profile");
const $signupButton      = $("#signup");
const $homeButton        = $("#home-button");

/**
 * Let Variables
 */
let passwordVisible = false; // for revealing the password.
let isAdmin         = false; // for enabling admin login

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
 function displayPopup()
 {
   $(".error").css("display","flex");
   console.log("here");
 }

 function closePopup(){
  $(".error").css("display","none")
  $(".error").css("transition","0.4s");
  console.log("closed");
}

function checkUserExists(data) {
  
  if (data.length === 0) {
    displayPopup(); // error message displayed

    // clearing the old values from the inputs
    $("#username_log").val("");
    $("#password_log").val("");

  } 
  else {
    if (data[USER].admin == true) {
      console.log("admin login")
      window.location.href ="/admin_user_views"
    }
    else {
      window.location.href ="/success"
    }
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
  

}

function setup() {
    console.log("login.js loaded")
    $("#submit-button").on("click", attemptLogin);
    showPassword();
    adminLogin();





    let $topBars =  $(".top-bar");
    
    for(let i = 0; i < AMOUNT_OF_BARS; i++)
    {
        let $element = $($topBars[i]);

        if(i == HOME_PAGE)
        {
            $element.css("background-color","black");

        }
        
    }

    $signupButton.on("click", function(){
    })
    
    $homeButton.on("click", function(){
        window.location.href = "/"
    })
    
    $("#back-button").on("click", ()=> {
      window.location.href = "/";
    })
    $("#map-button").on("click", () => {
        console.log("map clicked");
        window.location.href = "/map";
    })
    
    $("#profile-button").on("click", ()=>{
        window.location.href = "/profile";
    })

    $(".close-button").on("click", closePopup)
    
  }
  
  $(document).ready(setup);
