var coords = document.getElementById("coordinates");

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
}

document.getElementById("track-button").onclick = function() {
    getLocation()};

// Initialize and add the map
function initMap() {
    // The location of vancouver
    const vancouver = { lat: 49.283, lng: -123.121 };
    // The map, centered on vancouver (please work)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: vancouver,
    });
  }


  


  
window.initMap = initMap;