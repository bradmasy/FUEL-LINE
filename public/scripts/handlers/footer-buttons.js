
/**
 * Sets up the page.
 */
function setup() {

    $(".logout-button").on("click", () => {
        console.log("logout")
        window.location.href = "/logout";
    });

    $("#home-button").on("click", () => {
        console.log("clicked");
        window.location.href = "/";
    })

    $("#map-button").on("click", () => {
        console.log("map clicked");
        window.location.href = "/map";
    })

    $("#profile-button").on("click", () => {
        window.location.href = "/profile";
    })


    $("#logout-button").on('click', function () {
        window.location.href = "/logout";
    })

    $("#home-button").on("click", () => {
        window.location.href = "/";
    })
    $(".nav-buttons").on("click", function () {
        $(this).triggerHandler("focus");
    })
}


$(document).ready(setup);
