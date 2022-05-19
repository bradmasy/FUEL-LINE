let map;
let drivingDistanceGlobal;


/**
 * Gets a timestamp of when the directions were requested.
 * 
 * @returns an array containing the date of the request and the exact time in military.
 */
function getTimeStamp()
{
  let date        = new Date();
  let dd          = String(date.getDate()).padStart(2, '0');
  let mm          = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy        = date.getFullYear();
  date            = mm + '/' + dd + '/' + yyyy;
  let today       = new Date();
  let time        = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return [date,time];
}


/**
 * Creates a trip object based on the users programmed trip.
 * 
 * @param {Object} distanceOB an object representing all the data about the trip.
 */
function createTripObjectForUser(distanceOB)
{
  let destination = distanceOB.start_address; 
  let origin      = distanceOB.end_address;
  let distance    = distanceOB.distance.value;
  let timeStamp   = getTimeStamp();

  let data = {
    "origin":origin,
    "destination":destination,
    "distance":distance,
    "date": timeStamp[0],
    "time": timeStamp[1]
  }

  let options = {
    method:"POST",
    body:JSON.stringify(data),
    headers: {
      "Content-Type":"application/json"
    }
  }

  fetch("/create-trip",options);
  
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
    this.map                = map;
    this.originPlaceId      = "";
    this.destinationPlaceId = "";
    this.travelMode         = google.maps.TravelMode.DRIVING;
    this.directionsService  = new google.maps.DirectionsService();
    // this.directionsRenderer = new google.maps.DirectionsRenderer();
    // this.directionsRenderer.setMap(map);
    var originInput         = document.getElementById("origin-input");
    var destinationInput    = document.getElementById("destination-input");
    // Specify just the place data fields that are needed.
    var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
      fields: ["place_id"],
    });
    // Specify just the place data fields that are needed.
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
        provideRouteAlternatives: true,
      },
      function (response, status) {
        if (status === "OK") 
        {

          // me.directionsRenderer.setDirections(response);


          var rendererOptions = {
            map: map,
            directions: response,
        }

          directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

          for (var routeNumber = 0, numberOfRoutes = response.routes.length; routeNumber < numberOfRoutes; routeNumber++) {
          directionsDisplay.setRouteIndex(routeNumber);
          }
          var directionsData = response.routes[0].legs[0];
          console.log(directionsData)
          var drivingDistance = directionsData.distance.text;
          drivingDistanceGlobal = drivingDistance;
          console.log("Number of routes" + response.routes.length);
          console.log("Driving distance" + drivingDistanceGlobal);
          

          //creating the trip object here.
          console.log(response);
          createTripObjectForUser(directionsData)
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



function calculate_costs(){
  jQuery("#result").empty();
    console.log("calculate costs got called")
    console.log($("#distance").val())
    var distance     = parseFloat(drivingDistanceGlobal.replace(/[^0-9.]/g, ""))
    console.log(distance)
    var economy      = parseFloat($("#economy").val());
    var gas_price    = parseFloat($("#gas-price").val());
    var cost         = ( distance / economy ) * gas_price
    var cost_rounded = cost.toFixed(2)
    console.log(cost)
    jQuery("#result").append("Total cost of trip will be: $" + cost_rounded)
}




function setup() {
  $("#calculation-form").hide();
  initMap();
  let $topBars = $(".top-bar");
  // $topBars[3].css("background-color","black");
  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 3) {
      $element.css("background-color", "black");
    }
  }
  $("#calculate").click(calculate_costs);

}




$(document).ready(setup);