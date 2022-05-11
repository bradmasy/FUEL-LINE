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



function setup() {
  console.log("document ready");
  getUserInfo();

  let $topBars = $(".top-bar");

  $("#home-button").on("click", () => {
    window.location.href = "/";
  });

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i != 2) {
      $element.css("background-color", "#FF912C");
    }
    console.log($element);
  }

  $("#stats-button").on("click", () => {
    window.location.href = "/statistics";
  });
}

$(document).ready(setup);
