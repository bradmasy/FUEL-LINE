const $profileButton = $("#profile");
const $signupButton  = $("#signup");
const $homeButton    = $("#home-button");
let animationHandler;
let counter          = 0;
let limit            = 500;
let clickCount           = 0;
let secretAmountOfCLicks = 3;
let positionIncrement = 2;

$signupButton.on("click", function(){
})

$homeButton.on("click", function(){
    window.location.href = "/index"
})

$("#map-button").on("click", () => {
    console.log("map clicked");
    window.location.href = "/map";
})

$("#profile-button").on("click", ()=>{
    window.location.href = "/profile";
})

function incrementHandler()
{

    if(counter < limit)
    {
        counter += positionIncrement;
      
        $("#easter-egg").css("left",`${counter}`);
        
        animationHandler = requestAnimationFrame(incrementHandler);
    }
    else{
        cancelAnimationFrame(animationHandler);
        $("#easter-egg").fadeOut("fast");

        $("#easter-egg").promise().done(()=>{

            $("#easter-content").css("display","none");
            $("#main-logo").fadeIn("slow");
            $("#content").fadeIn("slow");

            counter = 0;
        })
    }

    return animationHandler;
}

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
        console.log($element);
    }

    $signupButton.on("click", function(){
    })
    
    $homeButton.on("click", function(){
        window.location.href = "/index"
    })
    
    $("#map-button").on("click", () => {
        window.location.href = "/map";
    })
    
    $("#profile-button").on("click", ()=>{
        window.location.href = "/profile";
    })

    $("#main-logo").on("click", () => {
        if(clickCount == secretAmountOfCLicks)
        {
            $("#main-logo").fadeOut("slow");
            $("#content").fadeOut("slow");
    
            $("#main-logo").promise().done(() => {
                
                $("#content").css("display","none");
                $("#easter-content").css("display","flex");
                $("#easter-egg").fadeIn("slow");
    
                animationHandler = requestAnimationFrame( incrementHandler );
                clickCount = 0; // reset the counter.
            })
        }
        else
        {
            clickCount++; // increment the counter.
        }
    })
}

$(document).ready(setup);

