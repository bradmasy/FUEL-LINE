// let touchXAxis = 0;
// let touchXAxisEnd = 0;
// let touchYAxis = 0;
let LOGOUT_CALL=0

function process_user_info(data) {
    //if user is logged in, populates the profile page. if not, redirects to login page
  if (data.length === 0) {
    window.location.href = "/login";
  } else {
    console.log(data)
    $("#name").html(`<p>${data.username}</p>`);
    $("#email").html(`<p>${data.email}</p>`);
    if (data.hasOwnProperty('vehicle_efficiency')){
      $("#fuel-efficiency").html(`<p>${(data.vehicle_efficiency).toFixed(2)} L/100KM</p>`);
    }
    else {
      $("#fuel-efficiency").html(`<p><button id='add-vehicle'>Add Vehicle!</button></p>`);
    }
    
  }
}

function getUserInfo() {
    // gets the current logged in users info
  console.log("called getUserInfo");
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: process_user_info,
  });
}

function displayEdit()
{
 $(".edit").fadeIn();

}

function closeEdit(){
 $(".edit").fadeOut();

}

function logout_open(){
    $(".logout-contain").animate({width:'toggle'},500);
}

function logout_close(){
    $(".logout-contain").animate({width:'toggle'},500);
}

 



/**
 * Sets up the page
 */
function setup() {
  console.log("document ready");
  getUserInfo();

  let $topBars = $(".top-bar");


  $("#home-button").on("click", () => {
    window.location.href = "/";
  });

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 2) {
      $element.css("background-color", "#FF912C");
    }
    console.log($element);
  }

  $("#stats-button").on("click", () => {
    window.location.href = "/statistics";
  });

  $(".edit-button").on("click", displayEdit);

  $(".close-button").on("click", closeEdit)

  $(document).on("touchstart",(event) => {
    console.log("touched");
    console.log(event.changedTouches)
    touchXAxisStart = event.changedTouches[0].screenX;
    
  })


  $(document).on("touchend",(event) => {
    console.log("end");
    touchXAxisEnd = event.changedTouches[0].screenX;

    console.log(`start ${touchXAxisStart} end: ${touchXAxisEnd}`);

    if(touchXAxisStart > touchXAxisEnd) // signifies a swipe right.
    {
      window.location.href = "/car-choice";
    }
    else if(touchXAxisStart < touchXAxisEnd) // signifies a swipe right.
    {
      window.location.href = "/map";
    }
  
  })

  $('.logout-button').on('click', function(){
    window.location.href ="/logout";
  })

  $("#header-logo").on("click", () => {
    if (LOGOUT_CALL==0){
      $(".logout-contain").promise().done( logout_open )
      $(".logout-contain").fadeIn("slow")
      $(".logout-button").fadeIn("slow")
      LOGOUT_CALL=1
    }
    else {
      $(".logout-contain").promise().done( logout_close )
      $(".logout-contain").fadeOut("slow")
      $(".logout-button").fadeOut("slow")
      LOGOUT_CALL=0
    }})



  $("#info-div").on("click", "#add-vehicle", function () {
    console.log("car choice button clicked")
    window.location.href = "/car-choice";
  });
}

$(document).ready(setup);
