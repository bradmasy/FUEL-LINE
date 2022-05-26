/**
 * Profile Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

const PROFILE_HIGHLIGHT = 2;
const MAX_BARS          = 4;
const TOP_BARS          = 4;
const TWO_DECIMAL       = 2;
const NO_USER           = 0;

/**
 * Processes the users info and displays it to the screen.
 * 
 * @param {Array} data an array of user data representing the information the user has entered on their fuel line application. 
 */
function process_user_info(data) {
  if (data.length === NO_USER) 
  {
    window.location.href = "/login";
  } 
  else 
  {
    if(!data.profile_image =="")
    {
      $("#profile-pic").attr("src",`${data.profile_image}`)
    }

    $("#name").html(`<p>${data.username}</p>`);
    $("#email").html(`<p>${data.email}</p>`);

    if (data.hasOwnProperty("vehicle_model")) 
    {
      $("#vehicle-model").html(`<p>${data.vehicle_model}</p>`);
    } 
    else 
    {
      $("#vehicle-model").html(`<p></p>`);
    }
    if (data.hasOwnProperty("vehicle_efficiency")) 
    {
      $("#fuel-efficiency").html(
        `<p>${data.vehicle_efficiency.toFixed(TWO_DECIMAL)} L/100KM</p>`
      );
    }
    else 
    {
      $("#fuel-efficiency").html(
        `<p><button id='add-vehicle'>Add Vehicle!</button></p>`
      );
    }
  }
}

/**
 * Gets the users information wih a GET request to the server.
 */
function getUserInfo() 
{
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: process_user_info,
  });
}

/**
 * Displays the edit screen.
 */
function displayEdit() {
  $(".edit").fadeIn();
}

/**
 * Closes the edit screen.
 */
function closeEdit() {
  $(".edit").fadeOut();
}

/**
 * Sets up the page
 */
function setup() {
  getUserInfo();

  let $topBars = $(".top-bar");

  $("#home-button").on("click", () => {
    window.location.href = "/";
  });

  for (let i = 0; i < TOP_BARS; i++) 
  {
    let $element = $($topBars[i]);

    if (i == PROFILE_HIGHLIGHT)
    {
      $element.css("background-color", "#FF912C");
    }
  }

  $("#stats-button").on("click", () => {
    window.location.href = "/statistics";
  });

  $(".edit-button").on("click", displayEdit);

  $(".close-button").on("click", closeEdit);


  $("#info-div").on("click", "#add-vehicle", function ()
  {
    window.location.href = "/car-choice";
  });
}

$(document).ready(setup);
