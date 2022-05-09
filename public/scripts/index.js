const $profileButton = $("#profile");
const $signupButton  = $("#signup");
const $homeButton    = $("#home-button");

console.log($profileButton);

// $signupButton.mouseleave(function(){
  
// })

// $signupButton.click( function(){
//     // window.location.href = "../signup.html"
// })

$homeButton.on("click", function(){
    window.location.href = "/index"
})

$("#profile").on("click",() =>{
    console.log("clicked");
    // window.location.href = "/profile";

    window.location.href = "/profile.html";
})


function setup()
{
    console.log("document ready");
}

$(document).ready(setup);