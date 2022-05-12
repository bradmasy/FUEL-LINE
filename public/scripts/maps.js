// var coords = document.getElementById("coordinates");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    coords.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  initMap(position.coords.latitude, position.coords.longitude)
}

// document.getElementById("track-button").onclick = function() {
//     getLocation()
    
// };

// Initialize and add the map
function initMap() {
    // The location of vancouver
    const vancouver = { lat: 49.2835025, lng:  -123.1154588 };
    // const vancouver = { lat: latitude, lng:  longitude };
    // The map, centered on vancouver (please work)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: vancouver,
    });
  }

// window.initMap = initMap(49.2835025, -123.1154588);

function setup()
{
    let $topBars =  $(".top-bar");

    for(let i = 0; i < 4; i++)
    {
        let $element = $($topBars[i]);
        if(i == 3)
        {
            $element.css("background-color","black");

        }
        console.log($element);
    }

    $("#track-button").on("click", () => {
        getLocation()
    })

    initMap();
}

$(document).ready(setup);