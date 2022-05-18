const $profileButton = $("#profile");
const $signupButton  = $("#signup");
const $homeButton    = $("#home-button");



$signupButton.on("click", function(){
})

$homeButton.on("click", function(){
    window.location.href = "/index"
})

$("#map-button").on("click", () => {
    console.log("map clicked");
    window.location.href = "/map";
})

$("#profile-button").on("click", ()=>{
    window.location.href = "/profile";
})

function setup()
{
    console.log("document ready");
    
    let $topBars =  $(".top-bar");
    
    for(let i = 0; i < 4; i++)
    {
        let $element = $($topBars[i]);
        if(i == 0)
        {
            $element.css("background-color","#FF912C");

        }
        console.log($element);
    }

    $signupButton.on("click", function(){
    })
    
    $homeButton.on("click", function(){
        window.location.href = "/index"
    })
    
    $("#map-button").on("click", () => {
        window.location.href = "/map";
    })
    
    $("#profile-button").on("click", ()=>{
        window.location.href = "/profile";
    })
    



}

$(document).ready(setup);

