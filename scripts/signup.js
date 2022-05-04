/**
 * signup.JS for the signup page
 */



/**
 * Constant Variables
 */

const $backButton        = $("#back-button");
const $confirmButton     = $("#confirm-button");
let $userPassword        = $("#user-pass");
const $showPasswordBox   = $("#show");
const $showPasswordTitle = $("#pass-title");
let $username            = $("#username");
let $userEmailAddress    = $("#email");
let $confirmPass         = $("#confirm-pass");

/**
 * Let Variables
 */

let passwordVisible = false; // for revealing the password.

/**
 * Functions
 */



 function getValues()
 {
     let username        = $username.val();
     let emailAddress    = $userEmailAddress.val();
     let password        = $userPassword.val();
     let confirmPassword = $confirmPass.val();

     console.log(username);
     console.log(emailAddress);
     console.log(password);
     console.log(confirmPassword);




    let user = new User(username,emailAddress,password);
    console.log(user);

 }



/**
 * Event Handlers
 */

$backButton.on("click", () => {
    window.location.href = "../index.html"
})

$confirmButton.on("click", ()=> {
    console.log("working");
    getValues();
})

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

function setup()
{
    console.log("document ready");
    showPassword();
}

$(document).ready(setup);