/**
 * Privacy Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

const TOPS_BARS   = 4
const PRIVACY_BAR = 0


function getUserInfo() {
  // Gets the current logged in users info
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: function (data) {
      if(data.admin)
      {
        $("#admin-route").css("display","flex");
      }
    },
    error: function (textStatus, errorThrown) {
      process_user_info("data not found");
    },
  });
}


function getUserInfo()
{
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: (e) => {
      if(e.admin)
      {
        $("#admin-route").css("display","flex")

      }
    },
  });
}
/**
 * Sets up the page.
 */
function setup()
{

  getUserInfo();
    let $topBars = $(".top-bar");
  
    for (let i = 0; i < TOPS_BARS; i++) 
    {
      let $element = $($topBars[i]);

      if (i == PRIVACY_BAR) 
      {
        $element.css("background-color", "#FF912C");
      }
    }
  
}

$(document).ready(setup)