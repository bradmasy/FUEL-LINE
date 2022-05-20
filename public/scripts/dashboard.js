
let chartCanvas       = $("#chart");
let objectTrips       = [];
let tripLabels        = [];
let dataSet           = [];
let defaultTimePeriod = "month";
const CONVERT_TO_KM   = 1000;
let user;
let totalDistance;
let amountSpent;
let myChart
let LOGOUT_CALL       = 0


function logout_open(){
    $(".logout-contain").animate({width:'toggle'},500);
}

function logout_close(){
    $(".logout-contain").animate({width:'toggle'},500);
}

function getDay()
{
    let currentDate = new Date();
    let dd          = String(currentDate.getDate()).padStart(2, '0');
    return dd;
}

function getMonth()
{
    let currentDate = new Date();
    let mm          = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    return mm;
}

function getYear()
{
    let currentDate = new Date();

    let yyyy        = currentDate.getFullYear();
    return yyyy;

}

/**
 * Gets the total distance of the users trips.
 * 
 * @returns the total distance the user has travelled.
 */
function getTotalDistance() {
    let distance = 0;

    for (let i = 0; i < objectTrips.length; i++) {

        if(objectTrips[i].distance != null)
        {
            distance += objectTrips[i].distance;
            console.log("original: " + objectTrips[i].distance);

        }
    }

    distance = (distance / 1000).toFixed(2);
    console.log("distance before: " + distance)
    return distance;
}

function getTotalSpend() {
    let amount = 0;

    for (let i = 0; i < objectTrips.length; i++) {
        if (objectTrips[i].cost != null) {
            amount += parseFloat(objectTrips[i].cost);
            console.log(objectTrips[i].cost);
        }
    }

    return amount.toFixed(2);
}

/**
 * Creates the labels for the graph based on the objects trip dates as globals (to avoid asynchronous issues).
 */
async function createLabels(timePeriod) {

    let dd          = getDay();
    let mm          = getMonth();
    let yyyy        = getYear();
    let xAxisLabel;
    let yAxisLabel;

    for (let i = 0; i < objectTrips.length; i++) {

        if (objectTrips[i].date != null && objectTrips[i].distance != null) {

            if (timePeriod == "month") {

                let tripMonth = objectTrips[i].date.slice(0, 2);

                if (tripMonth == mm) {
                    tripLabels.push(objectTrips[i].date);
                    dataSet.push((objectTrips[i].distance/1000).toFixed(1));
                    xAxisLabel = "Distance Travelled in KM";
                    yAxisLabel = "Date of Trip";
                }
            }
            else if (timePeriod == "day") {

                let tripDay = objectTrips[i].date.slice(3, 5);
                
                if(tripDay == dd)
                {
                    dataSet.push(objectTrips[i].cost);
                    tripLabels.push((objectTrips[i].distance/1000).toFixed(1));
                    xAxisLabel = "Distance Travelled in KM";
                    yAxisLabel = "Cost Per Trip in CAD";
                }
            }
            else if (timePeriod == "year") {

                let tripYear = objectTrips[i].date.slice(6,10);

                if(tripYear == yyyy)
                {
                    dataSet.push(objectTrips[i].cost);
                    tripLabels.push(objectTrips[i].date.slice(0,5));
                    xAxisLabel = `Trips Taken (Month/Day) in ${tripYear}`;
                    yAxisLabel = "Cost Per Trip in CAD";
                }
            }
        }
    }

    return [xAxisLabel,yAxisLabel];
}

/**
 * Asynchronously gets the users data to parse.
 */
async function getUserData() {
    await fetch("/user-data").then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((object) => {

        user = object; // setting the global user.

        for (let i = 0; i < object.trips.length; i++) {
            objectTrips.push(object.trips[i]);
        }

        totalDistance = getTotalDistance();
        amountSpent   = getTotalSpend();

    }).catch((err) => {
        console.log("error");
    })
}

/**
 * Draws the chart.
 */
async function drawChart(timePeriod) {
    let labelInfo  = await createLabels(timePeriod);
    let xAxisLabel = labelInfo[0];
    let yAxisLabel = labelInfo[1];

    myChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: tripLabels,
            datasets: [{
                label: `Trips Per ${timePeriod[0].toUpperCase() + timePeriod.slice(1,timePeriod.length)}`,
                data: dataSet,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title:{
                        display:true,
                        text: yAxisLabel,
                        color:"blue"
                    }  
                },
                x: {
                    beginAtZero: true,
                    title:{
                        display:true,
                        text:xAxisLabel,
                        color:"blue"
                    }  
                }
            }
        }
    });
}


function compareTimePeriodToObject (period,object)
{
    let objectPeriod;
    let time;

    switch(period)
            {
                case "day":
                    {
                        console.log(object)
                        objectPeriod =  object.slice(3, 5);
                        time         =  getDay();
                        break;
                    } 
                case "month": 
                {
                    objectPeriod =  object.slice(0, 2);
                    time         =  getMonth();
                    break;
                }
                case "year":
                    {
                        objectPeriod =  object.slice(6, 10);
                        time         =  getYear()
                    }
                    break;
                }
    return [objectPeriod,time];
}
/**
 * Performs the agregations based on the day time period.
 */
function aggregations(period)
{
    let objectPeriod;
    let time;
    let instances        = 0;
    let distance         = 0;
    let currentAmountCAD = 0 ;

    for(let i = 0; i < objectTrips.length; i++)
    {
        if(objectTrips[i].date != null)
        {
            let data     = compareTimePeriodToObject(period,objectTrips[i].date);
            objectPeriod = data[0];
            time         = data [1];
    
            if(objectPeriod == time)
            {
                distance += (objectTrips[i].distance/1000);


                    if (objectTrips[i].cost != null) {

                        currentAmountCAD += parseFloat(objectTrips[i].cost);
                    }

                instances++; // increase the amount of instances
            }
        }
    }

    return [instances, distance, currentAmountCAD];
}

function getTimePeriod() {

    let timePeriod       = $("#time-period").val()
    dataSet              = [];
    tripLabels           = [];
    let instances        = 0;
    let distance         = 0;
    let currentAmountCAD = 0 ;
    let data             = aggregations(timePeriod);
    instances            = data[0];
    distance             = data[1];
    currentAmountCAD     = data[2];
    let average          = (currentAmountCAD / instances).toFixed(2);
    
    if(isNaN(average))
    {
        average = 0;
    }

    $("#trip-average").html(`You Spent: $${average}/Per Trip This Time Period.`)
    $("#distance-driven").html(`Total Distance: ${(distance).toFixed(2)}KM`);
    $("#amount-spent").html(`Total Spend [CAD]: $${currentAmountCAD.toFixed(2)}`);

    myChart.destroy(); // destroy the chart and rebuild.
    drawChart(timePeriod);
}

async function setup() {

    await getUserData();
    $("#username").html(`Welcome, ${user.username[0].toUpperCase() + user.username.slice(1, user.username.length)}!`);
    let average = (amountSpent / objectTrips.length).toFixed(2);

    if(isNaN(average))
    {
        average = 0;
    }

    $("#time-period").on("change", getTimePeriod);
    $("#distance-driven").html(`Total Distance: ${totalDistance}KM`);
    $("#trip-average").html(`You Spent: $${average}/Per Trip This Time Period.`)
    $("#amount-spent").html(`Total Spend [CAD]: $${amountSpent}`);

    let defaultTimePeriod = "month";
    drawChart(defaultTimePeriod);
}

let $topBars = $(".top-bar");

for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 0) {
        $element.css("background-color", "#FF912C");
    }
}

$("#header-logo").on("click", () => {
    if (LOGOUT_CALL == 0){
      $(".logout-contain").promise().done( logout_open )
      $(".logout-contain").fadeIn("slow")
      $(".logout-button").fadeIn("slow")
      LOGOUT_CALL = 1
    }
    else {
      $(".logout-contain").promise().done( logout_close )
      $(".logout-contain").fadeOut("slow")
      $(".logout-button").fadeOut("slow")
      LOGOUT_CALL = 0
    }})

$(document).ready(setup);