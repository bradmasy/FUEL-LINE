const LOGOUT_BAR = 3;
const TOTAL_BARS = 4;

/**
 * Sets up the page.
 */
function setup()
{
  for (let i = 0; i < TOTAL_BARS; i++) 
  {
    let $element = $($topBars[i]);

    if (i == LOGOUT_BAR) {
      $element.css("background-color", "#FF912C");
    }
  }
}


$(document).ready(setup)
