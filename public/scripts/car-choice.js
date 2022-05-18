/**
 * car-choice for choosing car
 */
var year = 2021;
var converted_L = 0.0;
var make = "";
var model = "";

function createMakesMenu(car_makes_list) {
  console.log("createMakesMenu called");
  console.log(car_makes_list);
  select_makes = '<select name="makes" id="makes"> <option></option>';
  for (i = 0; i < car_makes_list.length; i++) {
    select_makes += `<option value="${car_makes_list[i]}">${car_makes_list[i]}</option>`;
  }
  select_makes += "</select>";
  $("#make-choice").html(select_makes);
  populate_model();
}

function processCarMakes(data) {
  console.log("called processCarMakes");
  console.log(data);
  car_makes_list = [];
  var car_makes = data.getElementsByTagName("text");

  for (var i = 0; i < car_makes.length; i++) {
    var make = car_makes[i].firstChild.nodeValue;
    car_makes_list.push(make);
  }
  createMakesMenu(car_makes_list);
}

function populate_make() {
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
  console.log("createModelsMenu called");
  console.log(car_models_list);
  select_models = '<select name="models" id="models"> <option></option>';
  for (i = 0; i < car_models_list.length; i++) {
    select_models += `<option value="${car_models_list[i]}">${car_models_list[i]}</option>`;
  }
  select_models += "</select>";
  $("#model-choice").html(select_models);
}

function processCarModels(data) {
  console.log("called processCarMakes");
  console.log(data);
  car_models_list = [];
  var car_models = data.getElementsByTagName("text");

  for (var i = 0; i < car_models.length; i++) {
    var model = car_models[i].firstChild.nodeValue;
    car_models_list.push(model);
  }
  createModelsMenu(car_models_list);
}

function populate_model() {
  $("#model-choice").empty();
  console.log("populate model function got called");
  make = $("#makes").find(":selected").text();
  console.log(make);

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
    success: processCarModels,
  });
}

function displayFuelEfficiency(converted_L) {
  console.log("displayFuel efficiency was called");
  $("#result").empty();
  $("#result").html(
    `Fuel Efficiency of ${model} is: ${converted_L.toFixed(2)} L/100KM`
  );
  $("#confirm-button").show();
}

function processCarEfficiency(data) {
  console.log("ProcessCarEfficiency called");
  // console.log(data)
  // get the value of the fuel efficiency from XML data
  var i = data.getElementsByTagName("comb08U")[0];
  let $i = $("#comb08U");
  console.log($i);
  var fuel_efficiency = i.childNodes[0];
  fuel_efficiency = fuel_efficiency.nodeValue;
  // convert string mpg value to L/100KM
  console.log(fuel_efficiency);
  console.log(typeof fuel_efficiency);
  var mpg = parseFloat(fuel_efficiency);
  console.log(mpg);
  converted_L = 235.215 / mpg;
  console.log(converted_L);

  displayFuelEfficiency(converted_L);
}

function getFuelEfficiency() {
  console.log("get fuel efficiency");
  make = $("#makes").find(":selected").text();
  console.log(make);

  $.ajax({
    type: "get",
    url: `https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=${make}&model=${model}`,
    success: processCarEfficiency,
  });
}

function alertVehicleSaved() {
  console.log("Vehicle Saved");
  alert("Vehicle Saved")
}

function saveUserVehicle() {
  $.ajax({
    url: "/saveUserVehicle",
    type: "POST",
    data: {
      vehicle: converted_L,
    },
    success: alertVehicleSaved,
  });
}

function setup() {
  $("#confirm-button").hide();
  // for (let i = 0; i < 4; i++) {
  //   let $element = $($topBars[i]);
  //   if (i == 0) {
  //     $element.css("background-color", "black");
  //   }
  // }
  populate_make();
  $("#year").on("change", function () {
    console.log("year changed");
    populate_make(this.value);
  });

  $("#make-choice").on("change", "#makes", function () {
    console.log("makes value changed");
    populate_model(this.value);
  });
  $("#model-choice").on("change", "#models", function () {
    console.log("models value changed");
    console.log(this.value);
    model = this.value;
    getFuelEfficiency();
    // populate_model(this.value);
  });

  $("#confirm-button").on("click", saveUserVehicle);
}

$(document).ready(setup);