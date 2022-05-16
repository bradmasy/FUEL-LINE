let map;
let drivingDistanceGlobal;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map-section"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//     mapTypeControl: false,
//     scaleControl: false,
//     zoomControl: true,
//   });
// }

Object.defineProperty(exports, "__esModule", { value: true });
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
var AutocompleteDirectionsHandler = /** @class */ (function () {
  function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    var originInput = document.getElementById("origin-input");
    var destinationInput = document.getElementById("destination-input");
    // Specify just the place data fields that you need.
    var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
      fields: ["place_id"],
    });
    // Specify just the place data fields that you need.
    var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
  }
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete,
    mode
  ) {
    var _this = this;
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", function () {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }
      if (mode === "ORIG") {
        _this.originPlaceId = place.place_id;
      } else {
        _this.destinationPlaceId = place.place_id;
      }
      _this.route();
    });
  };
  AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;
    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      function (response, status) {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
          var directionsData = response.routes[0].legs[0];
          var drivingDistance = directionsData.distance.text;
          let drivingDistanceGlobal = drivingDistance;
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };
  return AutocompleteDirectionsHandler;
})();

window.initMap = initMap;



function calculate_costs(){
  jQuery("#result").empty();
    console.log("calculate costs got called")
    console.log($("#distance").val())
    var distance = parseInt($("#distance").val());
    var economy = parseInt($("#economy").val());
    var gas_price = parseInt($("#gas-price").val());


    var cost = ( distance / economy ) * gas_price
    var cost_rounded = cost.toFixed(2)
    console.log(cost)
    jQuery("#result").append("Total cost of trip will be: $" + cost_rounded)
}


function setup() {
  initMap();
  let $topBars = $(".top-bar");
  // $topBars[3].css("background-color","black");
  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 3) {
      $element.css("background-color", "black");
    }
    console.log($element);
  }
  $("#calculate").click(calculate_costs);
}

$(document).ready(setup);
