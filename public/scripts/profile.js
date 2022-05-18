let touchXAxis = 0;
let touchXAxisEnd = 0;
let touchYAxis = 0;

function process_user_info(data) {
    //if user is logged in, populates the profile page. if not, redirects to login page
  if (data.length === 0) {
    window.location.href = "/login";
  } else {
    $("#name").html(`<p>${data[0].username}</p>`);
    $("#email").html(`<p>${data[0].email}</p>`);
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
  console.log("edit popup");
}

function closeEdit(){
 $(".edit").fadeOut();
 console.log("closed");
}

/**
 * Sets up the page
 */
function setup() {
  console.log("document ready");
  getUserInfo();

  let $topBars = $(".top-bar");

  
  for(let i = 0; i < 4; i++)
  {
      let $element = $($topBars[i]);
      if(i == 2)
      {
          $element.css("background-color","#FF912C");

      }
      console.log($element);
  }

  $("#home-button").on("click", () => {
    window.location.href = "/";
  });

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
      window.location.href = "/car-choice"
    }
    
  })




}

$(document).ready(setup);
