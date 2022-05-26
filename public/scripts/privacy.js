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

/**
 * Sets up the page.
 */
function setup()
{
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