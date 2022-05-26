/**
 * Success Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

const TOP_BARS  = 4;
const STATS_BAR = 2;

/**
 * Sets the page up.
 */
function setup()
{
    console.log("document ready");
    
    let $topBars =  $(".top-bar");

    
    for(let i = 0; i < TOP_BARS; i++)
    {
        let $element = $($topBars[i]);
        if(i == STATS_BAR)
        {
            $element.css("background-color","#FF912C");
        }
    }

    $("#stats-button").on("click", ()=>{
        window.location.href = "/statistics";
    })

    $("#back-button").on("click", () =>{
        window.location.href = "/profile";
    })

}

$(document).ready(setup);