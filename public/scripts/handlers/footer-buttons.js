

function setup() {

    $("#home-button").on("click", ()=>{
    console.log("clicked");
    window.location.href ="/";
    })
    
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
    $('.nav-buttons').on("click", function() {
        console.log("nav clicked");
        $(this).triggerHandler("focus");
    })
}

      
$(document).ready(setup);
