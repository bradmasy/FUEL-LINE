

function setup()
{
    $("#submit").on("click", () => {
        console.log("clicked");
        let val = $("#upload-button").val();
        val = val.slice(12,val.length);
        console.log(val);

        // window.location.href="/viewImg"

        let data ={
            "url":val

        }

        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        fetch("/uploadImage", options);
    })
}


$(document).ready(setup)