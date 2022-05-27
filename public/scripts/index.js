/**
 * Index Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

const $profileButton     = $("#profile");
const $signupButton      = $("#signup");
const $homeButton        = $("#home-button");
let counter              = 0;
let limit                = 500;
let clickCount           = 0;
let secretAmountOfCLicks = 2;
let positionIncrement    = 1;
const soundtrack         = new Audio("../audio/Scooby Doo.mp3");
const soundtrackStart    = 5.15;
const NOT_CLICKED        = 0;
const CLICKED            = 1;
const SET_VOLUME         = 0.1;
soundtrack.currentTime   = 5.15;
let animationHandler;





/**
 * Increments the animation handler recursively until the base case is met.
 * 
 * @returns a reference to the animation handler. 
 */
 function incrementHandler()
 {
     if(counter < limit)
     {
         counter += positionIncrement;
         $("#easter-egg").css("left",`${counter}px`);
         console.log($("#easter-egg").css("left"));
         animationHandler = requestAnimationFrame( incrementHandler );
     }
     else
     {
         cancelAnimationFrame(animationHandler);
         $("#easter-egg").fadeOut("fast");
         $("#easter-egg").promise().done(()=>{
             $("#easter-content").css("display","none");
             $("#main-logo").fadeIn("slow");
             $("#content").fadeIn("slow");
             counter = 0;
             soundtrack.pause();
             soundtrack.currentTime = soundtrackStart;
         })
     }
     return animationHandler;
 }



// /**
//  * Increments the animation handler recursively until the base case is met.
//  * 
//  * @returns a reference to the animation handler. 
//  */
// function incrementHandler()
// {
//     if(counter < limit)
//     {
//         counter += positionIncrement;
//         console.log(counter);

//         $("#easter-egg").css("left",`${counter}`);
        
//         animationHandler = requestAnimationFrame(incrementHandler);
//     }
//     else
//     {
//         cancelAnimationFrame(animationHandler);
//         $("#easter-egg").fadeOut("fast");
//         $("#easter-egg").promise().done(()=>{

//             $("#easter-content").css("display","none");
//             $("#main-logo").fadeIn("slow");
//             $("#content").fadeIn("slow");

//             counter = 0;
//             soundtrack.pause();
//             soundtrack.currentTime = 5.15;
//         })
//     }

//     return animationHandler;
// }

/**
 * Runs the animation when three clicks have been made to the image.
 */
function animation()
{$("#main-logo").css("opacity","100%");
    $("#content").css("display","none");
    $("#easter-content").css("display","flex");
    $("#easter-egg").fadeIn("slow");

    animationHandler = requestAnimationFrame( incrementHandler );
    clickCount       = 0; // reset the counter.
}

/**
 * Sets up the page.
 */
function setup()
{
    let $topBars =  $(".top-bar");
    
    for(let i = 0; i < 4; i++)
    {
        let $element = $($topBars[i]);

        if(i == 0)
        {
            $element.css("background-color","#FF912C");
        }
    }

    $("#main-logo").on("click", () => {
        if(clickCount == 0)
        {
            $("#main-logo").css("transition","0.8s");
            $("#main-logo").css("opacity","70%");
        }
        else if(clickCount == 1)
        { 
            $("#main-logo").css("transition","0.8s");
            $("#main-logo").css("opacity","50%");

        }
        if(clickCount == secretAmountOfCLicks)
        {

            soundtrack.volume        = 0.1;
            soundtrack.currentTime   = 5.15;
            soundtrack.play();

            $("#main-logo").fadeOut("slow");
            $("#content").fadeOut("slow");
            // $("#easter-egg").css("left","100px");

            $("#main-logo").promise().done( animation );


        }
        else
        {
            clickCount++; // increment the counter.
        }
            
    })
}

$(document).ready(setup);

