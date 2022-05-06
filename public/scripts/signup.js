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
    window.location.href = "../index.html"
})

$confirmButton.on("click", ()=> {
    // alert("confirm");
    window.location.href = "../success.html"
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



function setup()
{
    console.log("document ready");
    showPassword();
}

$(document).ready(setup);