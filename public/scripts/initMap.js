let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map-section"), {
      center: { lat: 49.2835025, lng: -123.1154588 },
      zoom: 14,
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: true,
      fullscreenControl: false,
    });
    new AutocompleteDirectionsHandler(map);
  }