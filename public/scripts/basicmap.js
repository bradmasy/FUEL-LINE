let map;
let drivingDistanceGlobal;
var fuel_efficiency = 8.9;
let directionsObject;

function createTripObjectForUser(distanceOB,tripCost) {
  let destination = distanceOB.start_address;
  let origin      = distanceOB.end_address;
  let distance    = distanceOB.distance.value;

  let data = {
    origin: origin,
    destination: destination,
    distance: distance,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("/create-trip", options);
  console.log(destination);
  console.log(origin);
}

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

          var directionsData    = response.routes[0].legs[0];
          directionsObject      = directionsData; // setting global.
          var drivingDistance   = directionsData.distance.text;
          drivingDistanceGlobal = drivingDistance;

          window.alert(drivingDistanceGlobal);

          //creating the trip object here...
          
          $("#calculation-form").show();
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };
  return AutocompleteDirectionsHandler;
})();

window.initMap = initMap;

function calculate_costs() {
  jQuery("#result").empty();
 
  var distance     = parseFloat(drivingDistanceGlobal.replace(/[^0-9.]/g, ""));
  var gas_price    = parseFloat($("#gas-price").val());
  var cost         = (distance / fuel_efficiency) * gas_price;
  var cost_rounded = cost.toFixed(2);

  createTripObjectForUser(directionsObject,cost_rounded);
  jQuery("#result").append("Total cost of trip will be: $" + cost_rounded);
}

function process_user_info(data){
  console.log("called process_user_info")
  if (data.hasOwnProperty('vehicle_efficiency')){
    console.log("vehicle data exists")
    fuel_efficiency = data.vehicle_efficiency
  }
  else {
    console.log("vehicle data does not exist")
  }
}

function getUserInfo() {
  // gets the current logged in users info
  console.log("called getUserInfo");
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: function (data) {process_user_info(data)},
    error: function (textStatus, errorThrown) {
      process_user_info("data not found")
    }
  
  });
}

function setup() {
  getUserInfo();
  $("#calculation-form").hide();
  initMap();
  let $topBars = $(".top-bar");
  // $topBars[3].css("background-color","black");
  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 3) {
      $element.css("background-color", "#FF912C");
    }
    console.log($element);
  }
  $("#calculate").on("click", calculate_costs);
}

$(document).ready(setup);
