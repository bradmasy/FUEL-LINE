
let chartCanvas       = $("#chart");
let objectTrips       = [];
let tripLabels        = [];
let dataSet           = [];
let defaultTimePeriod = "month";
const CONVERT_TO_KM   = 1000;
let LOGOUT_CALL       = 0;
const TWO_PLACES      = 2;
const ONE_PLACE       = 1;
const M_START         = 0;
const M_END           = 2
const D_START         = 3;
const D_END           = 5;
const Y_START         = 6;
const Y_END           = 10;
const MD_START        = 0;
const MD_END          = 5;
const XAXIS_LAB       = 0;
const YAXIS_LAB       = 1;
const FIRST_LETTER    = 0;
const LOWERCASE_STRT  = 1;
const BORDER_WIDTH    = 1;
const PERIOD          = 0;
const TIME            = 1;
const INSTANCES       = 0;
const DISTANCE        = 1;
const AMOUNT_CAD      = 2;
const TOP_BARS        = 4;
const DASHBOARD       = 0;

let user;
let totalDistance;
let amountSpent;
let myChart

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

    distance = (distance / CONVERT_TO_KM).toFixed(TWO_PLACES);
    console.log("distance before: " + distance)
    return distance;
}

/**
 * Gets the total spend of the trips. 
 * 
 * @returns the total spend of the trips
 */
function getTotalSpend() 
{
    let amount = 0;

    for (let i = 0; i < objectTrips.length; i++) 
    {
        if (objectTrips[i].cost != null) 
        {
            amount += parseFloat(objectTrips[i].cost);
            console.log(objectTrips[i].cost);
        }
    }

    return amount.toFixed(TWO_PLACES);
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

                let tripMonth = objectTrips[i].date.slice(M_START, M_END);

                if (tripMonth == mm) {
                    tripLabels.push(objectTrips[i].date);
                    dataSet.push((objectTrips[i].distance/CONVERT_TO_KM).toFixed(ONE_PLACE));
                    xAxisLabel = "Date of Trip";
                    yAxisLabel = "Distance Travelled in KM";
                }
            }
            else if (timePeriod == "day") {

                let tripDay = objectTrips[i].date.slice(D_START, D_END);
                
                if(tripDay == dd)
                {
                    dataSet.push(objectTrips[i].cost);
                    tripLabels.push((objectTrips[i].distance/CONVERT_TO_KM).toFixed(ONE_PLACE));
                    xAxisLabel = "Distance Travelled in KM";
                    yAxisLabel = "Cost Per Trip in CAD";
                }
            }
            else if (timePeriod == "year") {

                let tripYear = objectTrips[i].date.slice(Y_START,Y_END);

                if(tripYear == yyyy)
                {
                    dataSet.push(objectTrips[i].cost);
                    tripLabels.push(objectTrips[i].date.slice(MD_START,MD_END));
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
async function drawChart(timePeriod) 
{
    let labelInfo  = await createLabels(timePeriod);
    let xAxisLabel = labelInfo[XAXIS_LAB];
    let yAxisLabel = labelInfo[YAXIS_LAB];

    myChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: tripLabels,
            datasets: [{
                label: `Trips Per ${timePeriod[FIRST_LETTER].toUpperCase() + timePeriod.slice(LOWERCASE_STRT,timePeriod.length)}`,
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
                borderWidth: BORDER_WIDTH,
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

/**
 * Compares the time periods of the passed period selected and that present in the object.
 * 
 * @param {String} period the period of time the user has selected.
 * @param {String} object represents a date in the format MM/DD/YYYY.
 * @returns an array containing sliced date and time associated.
 */
function compareTimePeriodToObject (period,object)
{
    let objectPeriod;
    let time;

    switch(period)
            {
                case "day":
                    {
                        objectPeriod =  object.slice(D_START, D_END);
                        time         =  getDay();
                        break;
                    } 
                case "month": 
                {
                    objectPeriod =  object.slice(MD_START, M_END);
                    time         =  getMonth();
                    break;
                }
                case "year":
                    {
                        objectPeriod =  object.slice(Y_START, Y_END);
                        time         =  getYear()
                    }
                    break;
                }
    return [objectPeriod,time];
}
/**
 * Performs the agregations based on the day time period.
 * 
 * @param {String} period the selected period of time.
 * @returns an array containing the amount of instances of trips, the aggregated distances, and amount spent in CAD.
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
            objectPeriod = data[PERIOD];
            time         = data [TIME];
    
            if(objectPeriod == time)
            {
                distance += (objectTrips[i].distance/CONVERT_TO_KM);

                    if (objectTrips[i].cost != null) {

                        currentAmountCAD += parseFloat(objectTrips[i].cost);
                    }

                instances++; // increase the amount of instances
            }
        }
    }

    return [instances, distance, currentAmountCAD];
}

/**
 * Gets the time period.
 */
function getTimePeriod() {

    let timePeriod       = $("#time-period").val()
    dataSet              = [];
    tripLabels           = [];
    let instances        = 0;
    let distance         = 0;
    let currentAmountCAD = 0 ;
    let data             = aggregations(timePeriod);
    instances            = data[INSTANCES];
    distance             = data[DISTANCE];
    currentAmountCAD     = data[AMOUNT_CAD];
    let average          = (currentAmountCAD / instances).toFixed(TWO_PLACES);
    
    if(isNaN(average))
    {
        average = 0;
    }

    $("#trip-average").html(`You Spent: $${average}/Per Trip This Time Period.`)
    $("#distance-driven").html(`Total Distance: ${(distance).toFixed(TWO_PLACES)}KM`);
    $("#amount-spent").html(`Total Spend [CAD]: $${currentAmountCAD.toFixed(TWO_PLACES)}`);

    myChart.destroy(); // destroy the chart and rebuild.
    drawChart(timePeriod);
}

async function setup() {

    await getUserData();
    $("#username").html(`Welcome, ${user.username[0].toUpperCase() + user.username.slice(1, user.username.length)}!`);
    let average = (amountSpent / objectTrips.length).toFixed(TWO_PLACES);

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

for (let i = 0; i < TOP_BARS; i++) {
    let $element = $($topBars[i]);
    if (i == DASHBOARD) {
        $element.css("background-color", "#FF912C");
    }
}

// $("#header-logo").on("click", () => {
//     if (LOGOUT_CALL == 0){
//       $(".logout-contain").promise().done( logout_open )
//       $(".logout-contain").fadeIn("slow")
//       $(".logout-button").fadeIn("slow")
//       LOGOUT_CALL = 1
//     }
//     else {
//       $(".logout-contain").promise().done( logout_close )
//       $(".logout-contain").fadeOut("slow")
//       $(".logout-button").fadeOut("slow")
//       LOGOUT_CALL = 0
//     }})

$(document).ready(setup);