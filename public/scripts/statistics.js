
function setup()
{
    console.log("document ready");
    
    let $topBars =  $(".top-bar");

    
    for(let i = 0; i < 4; i++)
    {
        let $element = $($topBars[i]);
        if(i == 2)
        {
            $element.css("background-color","#FF912C");

        }
        console.log($element);
    }

    $("#stats-button").on("click", ()=>{
        window.location.href = "/statistics";
    })

    $("#back-button").on("click", () =>{
        window.location.href = "/profile";
    })

}

$(document).ready(setup);