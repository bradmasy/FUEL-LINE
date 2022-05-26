/**
 * Sets up the page.
 */
function setup()
{
    let $topBars = $(".top-bar");

  
    for (let i = 0; i < 4; i++) {
      let $element = $($topBars[i]);
      if (i == 0) {
        $element.css("background-color", "#FF912C");
      }
    }
  
}

$(document).ready(setup)