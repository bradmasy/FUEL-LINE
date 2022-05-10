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

$signupButton.click( function(){
    window.location.href = "/map"
})

$homeButton.on("click", function(){
    window.location.href = "/index"
})


function setup()
{
    console.log("document ready");
}

$(document).ready(setup);