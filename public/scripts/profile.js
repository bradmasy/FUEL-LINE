





function setup()
{
    console.log("document ready");
    
    let $topBars =  $(".top-bar");

    $("#home-button").on("click",()=>{
        window.location.href = "/";
    })

    
    for(let i = 0; i < 4; i++)
    {
        let $element = $($topBars[i]);
        if(i == 2)
        {
            $element.css("background-color","black");

        }
        console.log($element);
    }

    $("#stats-button").on("click", ()=>{
        window.location.href = "/statistics";
    })

}

$(document).ready(setup);