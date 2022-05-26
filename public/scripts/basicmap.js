let map;
let drivingDistanceGlobal;
let drivingDurationGlobal;
var fuel_efficiency = 8.9;
let directionsObject;
let whichRoute = 0;
let cost_rounded;
var gas_price = null;
let LOGOUT_CALL= 0;
var user_login_status = false;
/**
 * Gets a timestamp of when the directions were requested.
 *
 * @returns an array containing the date of the request and the exact time in military.
 */
function getTimeStamp() {
  let date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();
  date = mm + "/" + dd + "/" + yyyy;
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return [date, time];
}

/**
 * Creates a trip object based on the users programmed trip.
 *
 * @param {Object} distanceOB an object representing all the data about the trip.
 */

 function logout_open(){
  $(".logout-contain").animate({width:'toggle'},500);
}

function logout_close(){
  $(".logout-contain").animate({width:'toggle'},500);
}

function createTripObjectForUser(distanceOB, cost_rounded) {
  let destination = distanceOB.start_address;
  let origin = distanceOB.end_address;
  let distance = distanceOB.distance.value;
  let timeStamp = getTimeStamp();
  let cost = cost_rounded;

  let data = {
    origin: origin,
    destination: destination,
    distance: distance,
    date: timeStamp[0],
    time: timeStamp[1],
    cost: cost,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("/create-trip", options);
}

// Lets the the map get exported in

Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * initiates the map at set coordinates over Vancouver then creates/calls the AutocompleteDirectionsHandler.
     */
function initMap() {
  map = new google.maps.Map(document.getElementById("map-section"), {
    center: { lat: 49.2835025, lng: -123.1154588 },
    zoom: 14,
    mapTypeControl: false,
    scaleControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  });
  new AutocompleteDirectionsHandler(map);
}
/**
 * A Javascript version of a class that represents the autocompleting directions fields on the map and handles all of their methods.
 * 
 * @returns AutocompleteDirectionsHandler, this class returns itself
 */
var AutocompleteDirectionsHandler = /** @class */ (function () {

      /**
     * Constructs the autocompleting directions fields and pins them to the map.
     *
     * @param map a Google Maps Object to pin the fields to and insert the route onto
     */
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
    var nextRouteButton = document.getElementById("next-route");
    var prevRouteButton = document.getElementById("prev-route");
    var nextRouteDiv = document.getElementById("next-route-div");
    var prevRouteDiv = document.getElementById("prev-route-div");

    // Makes the next and previous route buttons invisble to start
    nextRouteDiv.style.display = "none";
    prevRouteDiv.style.display = "none";

    // Autocompletes text entered into the originInput field.
    var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
      fields: ["place_id"],
    });
    // Autocompletes text entered into the destinationInput field.
    var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );
    // Calls setupPlaceChangedListener for the originInput
    this.setupPlaceChangedListener(
      originAutocomplete,
      "ORIG",
      nextRouteButton,
      prevRouteButton
    );
    // Calls setupPlaceChangedListener for the destinationInput
    this.setupPlaceChangedListener(
      destinationAutocomplete,
      "DEST",
      nextRouteButton,
      prevRouteButton
    );

    // Pin the map controls to the map
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(
      prevRouteDiv
    );
    this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(
      nextRouteDiv
    );
  }

    /**
     * Handles what happens when the user clicks an autocompleted place.
     * 
     * !!THIS FUNCTION IS CALLED TWICE, ONCE FOR EACH INPUT FIELD!!
     *
     * @param autocomplete The autocomplete from the specified input
     * @param mode the mode - either Origin or Destination
     * @param nextRoute The button to change to the next route
     * @param prevRoute The button to change to the previous route
     */
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete,
    mode,
    nextRoute,
    prevRoute
  ) {
    var _this = this;
    autocomplete.bindTo("bounds", this.map);
    // Listens for the user to chose an autocomplete option, then calls route()
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

    // Listens for the user to click the next route button, then calls changeRoute()
    nextRoute.addEventListener("click", function () {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }
      // Changes which route is being displayed (this is called twice, hence the +0.5)
      whichRoute = whichRoute + 0.5;
      if (mode === "ORIG") {
        _this.originPlaceId = place.place_id;
      } else {
        _this.destinationPlaceId = place.place_id;
      }
      _this.changeRoute();
    });

    // Listens for the user to click the next route button, then calls changeRoute()
    prevRoute.addEventListener("click", function () {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }
      // Changes which route is being displayed (this is called twice, hence the -0.5)
      whichRoute = whichRoute - 0.5;
      if (mode === "ORIG") {
        _this.originPlaceId = place.place_id;
      } else {
        _this.destinationPlaceId = place.place_id;
      }
      _this.changeRoute();
    });
  };

  /**
  * Advances the route when the user clicks the changeRoute buttton.
  */
  AutocompleteDirectionsHandler.prototype.changeRoute = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;

    // Creates the route
    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
        provideRouteAlternatives: true,
      },

      // Gets the response from the API
      function (response, status) {
        if (status === "OK") {
          if (whichRoute > response.routes.length - 1) {
            whichRoute = response.routes.length - 1;
          }

          if (whichRoute < 0) {
            whichRoute = 0;
          }

          if (me.directionsRenderer.getMap != null) {
            me.directionsRenderer.setMap(null);
          }
          // Rerenders the map and sets the route on top of it
          me.directionsRenderer.setMap(map);
          me.directionsRenderer.setDirections(response);
          me.directionsRenderer.setRouteIndex(whichRoute);


          // Enable the previous route button at appropriate times
          if (whichRoute == 0) {
            document.getElementById("prev-route-div").style.display = "none";
          } else {
            document.getElementById("prev-route-div").style.display = "initial"; 
          }

          // Enable the previous route button at appropriate times
          if (whichRoute >= response.routes.length - 1) {
            document.getElementById("next-route-div").style.display = "none";
          } else {
            document.getElementById("next-route-div").style.display = "initial"; 
          }

          // Sets the colours of the different routes.
          switch (whichRoute) {
            case 0:
              me.directionsRenderer.setOptions({
                polylineOptions: {
                  strokeColor: "#0088FF",
                  strokeWeight: 6,
                  strokeOpacity: 0.6,
                },
              });
              break;
            case 1:
              me.directionsRenderer.setOptions({
                polylineOptions: {
                  strokeColor: "lawngreen",
                  strokeWeight: 6,
                  strokeOpacity: 0.6,
                },
              });
              break;
            case 2:
              me.directionsRenderer.setOptions({
                polylineOptions: {
                  strokeColor: "lightcoral",
                  strokeWeight: 6,
                  strokeOpacity: 0.6,
                },
              });
              break;
            default:
              me.directionsRenderer.setOptions({
                polylineOptions: {
                  strokeColor: "red",
                  strokeWeight: 6,
                  strokeOpacity: 0.6,
                },
              });
              break;
          }

          // Gets the object from which route information can be extracted
          var directionsData = response.routes[whichRoute].legs[0];
          var drivingDistance = directionsData.distance.text;
          drivingDistanceGlobal = drivingDistance;
          var drivingDuration = directionsData.duration.text;
          drivingDurationGlobal = drivingDuration;
          directionsObject = directionsData;
          // window.alert(drivingDistanceGlobal);
          if (gas_price != null) {
            calculate_costs();
          }
          

          directionsData = response.routes[0].legs[0];
          drivingDistance = directionsData.distance.text;
          drivingDistanceGlobal = drivingDistance;

        } else {
          window.alert("Directions request failed as a directions could not be found between the entered locations");
        }
      }
    );
  };
/**
 * Initializes the route from the user's chosen origin and destination locations.
 */
  AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    // Sets the first route to index 0
    whichRoute = 0;

    // Enable the next route button
    document.getElementById("next-route-div").style.display = "initial";
    // var nextRouteDiv = document.getElementById("next-route-div");
    // var prevRouteDiv = document.getElementById("prev-route-div");

    var me = this;



    // Creates the route
    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
        provideRouteAlternatives: true,
      },
      // Gets the response from the API
      function (response, status) {
        if (status === "OK") {
          if (me.directionsRenderer.getMap != null) {
            me.directionsRenderer.setMap(null);
          }
          // Rerenders the map and sets the route on top of it
          me.directionsRenderer.setMap(map);
          me.directionsRenderer.setDirections(response);
          me.directionsRenderer.setRouteIndex(whichRoute);
          // Gets the object from which route information can be extracted
          var directionsData = response.routes[whichRoute].legs[0];

          var drivingDistance = directionsData.distance.text;
          drivingDistanceGlobal = drivingDistance;
          var drivingDuration = directionsData.duration.text;
          drivingDurationGlobal = drivingDuration;
          // window.alert(drivingDistanceGlobal);
          directionsObject = directionsData;
          if (gas_price != null) {
            calculate_costs();
          }

          //creating the trip object here...
         
          $("#calculation-form").show();
        } else {
          window.alert("Directions request failed as a directions could not be found between the entered locations");
        }
      }
    );
  };
  return AutocompleteDirectionsHandler;
})();

window.initMap = initMap;

function calculate_costs() {

  if (gas_price == null) {
    gas_price = parseFloat($("#gas-price").val());
    if (isNaN(gas_price)) {
      alert("Enter price of gas without special characters");
      return;
    }
  }
  if (isNaN(gas_price)) {
    gas_price = parseFloat($("#gas-price").val());
  }
  var distance = parseFloat(drivingDistanceGlobal.replace(/[^0-9.]/g, ""));
  var cost = (distance / fuel_efficiency) * gas_price;
  cost_rounded = cost.toFixed(2);

  jQuery("#calculation-form").empty();

  jQuery("#calculation-form").append(
    "<span class='result'> Total cost of trip: $" +
      cost_rounded +
      "<br>" +
      "Total distance of trip: " +
      distance +
      "KM" +
      "<br>" +
      "Driving time of trip: " +
      drivingDurationGlobal +
      "</span>" +
      "<br>"
  );
  if (user_login_status == true) {
    $("#calculation-form").append("<button id='save-trip-button'> Go on route! </button>");
    $("#save-trip-button").on("click", () => {
      createTripObjectForUser(directionsObject, cost_rounded);
    });

  }
}

function process_user_info(data) {
  if (data.hasOwnProperty("vehicle_efficiency")) {
    fuel_efficiency = data.vehicle_efficiency;
    user_login_status = true;
  }
  if (data.hasOwnProperty("username")) {
    user_login_status = true;
  }
   else {
  }
}

function getUserInfo() {
  // Gets the current logged in users info
  $.ajax({
    url: `/getUserInfo`,
    type: "GET",
    success: function (data) {
      process_user_info(data);
    },
    error: function (textStatus, errorThrown) {
      process_user_info("data not found");
    },
  });
}


function setup() {
  getUserInfo();
  initMap();
  $("#calculation-form").hide();

  let $topBars = $(".top-bar");

  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 3) {
      $element.css("background-color", "#FF912C");
    }
  }
  $("#calculation-form").on("click", "#calculate", calculate_costs);
}

$("#header-logo").on("click", () => {
  if (LOGOUT_CALL == 0){
    $(".logout-contain").promise().done( logout_open );
    $(".logout-contain").fadeIn("slow");
    $(".logout-button").fadeIn("slow");
    LOGOUT_CALL = 1;
  }
  else {
    $(".logout-contain").promise().done( logout_close );
    $(".logout-contain").fadeOut("slow");
    $(".logout-button").fadeOut("slow");
    LOGOUT_CALL = 0;
  }});


$(document).ready(setup);
