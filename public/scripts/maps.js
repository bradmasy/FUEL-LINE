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

// Initialize and add the map
// function initMap(latitude, longitude) {
//     const vancouver = { lat: latitude, lng:  longitude };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 14,
//       center: vancouver,
//     });
//   }


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
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
}

$(document).ready(setup);