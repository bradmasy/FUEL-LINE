// $signupButton.on("click", function(){
// })

// $homeButton.on("click", function(){
//     window.location.href = "/index"
// })



function setup(){
    $("#map-button").on("click", () => {
        console.log("map clicked");
        window.location.href = "/map";
    })
    
    $("#profile-button").on("click", ()=>{
        window.location.href = "/profile";
    })
    
    $("#home-button").on("click", ()=>{
        window.location.href ="/";
    })
}

$(document).ready(setup);