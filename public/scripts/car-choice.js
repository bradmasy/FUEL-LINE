/**
 * Car-Choice Javascript.
 *
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

var year = 2021;
var converted_L = 0.0;
var make = "";
var model = "";

/**
 * Creates the Car Make Menu for the user to select their car's make.
 *
 * @param {Array} car_makes_list a list of all the car makes.
 */
function createMakesMenu(car_makes_list) {
  select_makes = '<select name="makes" id="makes"> <option></option>';

  for (i = 0; i < car_makes_list.length; i++) {
    select_makes += `<option value="${car_makes_list[i]}">${car_makes_list[i]}</option>`;
  }
  select_makes += "</select>";
  $("#make-choice").html(select_makes);
  populate_model();
}

/**
 *
 *
 * @param {*} data
 */
function processCarMakes(data) {
  car_makes_list = [];
  var car_makes = data.getElementsByTagName("text");

  for (var i = 0; i < car_makes.length; i++) {
    var make = car_makes[i].firstChild.nodeValue;
    car_makes_list.push(make);
  }
  createMakesMenu(car_makes_list);
}

function populate_make() {
  // gets all the car makes in the desired year by get request from fuel economy API
  console.log("populate make function got called");
  to_add = "";
  year = $("#year").val();
  year = $("#year").find(":selected").text();
  console.log(year);

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`,
    success: processCarMakes,
  });
}

function createModelsMenu(car_models_list) {
  // Uses the car models list to create a select menu
  console.log("createModelsMenu called");
  // console.log(car_models_list);
  select_models = '<select name="models" id="models"> <option></option>';
  for (i = 0; i < car_models_list.length; i++) {
    select_models += `<option value="${car_models_list[i]}">${car_models_list[i]}</option>`;
  }
  select_models += "</select>";
  $("#model-choice").html(select_models);
}

function processCarModels(data) {
  // Adds all the car makes in the selected model to a list and calls createModelsMenu function
  console.log("called processCarMakes");
  // console.log(data);
  car_models_list = [];
  var car_models = data.getElementsByTagName("text");

  for (var i = 0; i < car_models.length; i++) {
    var model = car_models[i].firstChild.nodeValue;
    car_models_list.push(model);
  }
  createModelsMenu(car_models_list);
}

function populate_model() {
  // gets all the car models in the desired year and make by get request from fuel economy API
  $("#model-choice").empty();
  console.log("populate model function got called");
  make = $("#makes").find(":selected").text();
  // console.log(make);

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
    success: processCarModels,
  });
}

function displayFuelEfficiency(converted_L) {
  // empties the result div and shows the fuel efficiency of the vehicle to the user
  console.log("displayFuel efficiency was called");
  $("#result").empty();
  $("#result").html(
    `Fuel Efficiency of ${model} is: ${converted_L.toFixed(2)} L/100KM`
  );
  $("#confirm-button").show();
}

function processVehicleID(data) {
  // gets the average Miles per Gallon of the selected vehicle and converts it to Liters / 100 KM
  var i = data.getElementsByTagName("avgMpg")[0];
  let $i = $("#avgMpg");
  console.log($i);

  var average_mpg = i.childNodes[0];

  average_mpg = average_mpg.nodeValue;

  var mpg = parseFloat(average_mpg);
  // console.log(mpg);
  converted_L = 235.215 / mpg;
  // console.log(converted_L);

  displayFuelEfficiency(converted_L);
}

function processCarEfficiency(data) {
  // get the value of the fuel efficiency from the specific vehicle page from the fuel economy API
  console.log("ProcessCarEfficiency called");
  // console.log(data)

  var i = data.getElementsByTagName("id")[0];
  let $i = $("#id");
  // console.log(i);
  if (i == null) {
    console.log("i is undefined");
    $("#result").empty();
    $("#result").html(`Fuel Efficiency of ${make} ${model} could not be found`);
    return;
  }
  var vehicle_id = i.childNodes[0];
  vehicle_id = vehicle_id.nodeValue;
  // convert string mpg value to L/100KM

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${vehicle_id}`,
    success: processVehicleID,
  });
}

function getFuelEfficiency() {
  // gets the ID of the chosen vehicle and sends it to the processCarEfficiency function
  console.log("get fuel efficiency");
  make = $("#makes").find(":selected").text();
  // console.log(make);

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=${make}&model=${model}`,
    success: processCarEfficiency,
  });
}

function alertVehicleSaved() {
  console.log("Vehicle Saved");
  alert("Vehicle Saved");
}

function saveUserVehicle() {
  // saves user vehicle information to database
  $.ajax({
    url: "/saveUserVehicle",
    type: "POST",
    data: {
      vehicle_model: model,
      vehicle: converted_L,
    },
    success: alertVehicleSaved,
  });
}

function setup() {
  // Hides the save vehicle button:
  $("#confirm-button").hide();
  $("#confirm-manual-button").hide();
  // creates make drop down off default value:
  populate_make();
  // changes the make drop down menu to correspond to that year:
  $("#year").on("change", function () {
    console.log("year changed");
    populate_make(this.value);
  });
  // creates car models drop down on change to makes:
  $("#make-choice").on("change", "#makes", function () {
    console.log("makes value changed");
    populate_model(this.value);
  });
  // gets the car efficiency once a model is selected
  $("#model-choice").on("change", "#models", function () {
    console.log("models value changed");
    console.log(this.value);
    model = this.value;
    getFuelEfficiency();
  });
  // Saves the users chosen vehicle to the user database
  $("#confirm-button").on("click", saveUserVehicle);
  // shows the submit manual efficiency button:
  $("#number-field").on("change", function () {
    console.log("input populated");
    $("#confirm-manual-button").show();
  });
  // Gets the data from input field and calls saveUserVehicle
  $("#confirm-manual-button").on("click", function () {
    console.log("manual input button clicked");
    converted_L = $("#number-field").val();
    console.log(converted_L);
    console.log(typeof converted_L);

    converted_L = parseFloat(converted_L);
    console.log(converted_L);
    console.log(typeof converted_L);
    if (isNaN(converted_L)) {
      console.log("not a number");
      alert("Fuel Efficiency must be a number measured in L/100KM");
      $("#number-field").val("");
      return;
    }
    saveUserVehicle();
  });
}

$(document).ready(setup);
