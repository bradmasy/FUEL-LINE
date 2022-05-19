
let chartCanvas = $("#chart");
let objectTrips = [];
let tripLabels = [];
let dataSet = [];
let defaultTimePeriod = "month";
let user;
let totalDistance;
let amountSpent;
let myChart

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

   
    let currentDate = new Date();
    let dd          = String(currentDate.getDate()).padStart(2, '0');
    let mm          = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy        = currentDate.getFullYear();

    for (let i = 0; i < objectTrips.length; i++) {


        if (objectTrips[i].date != null && objectTrips[i].distance != null) {

            if (timePeriod == "month") {

                let tripMonth = objectTrips[i].date.slice(0, 2);

                if (tripMonth == mm) {
                    tripLabels.push(objectTrips[i].date);
                    dataSet.push((objectTrips[i].distance/1000).toFixed(1));
                }
            }
            else if (timePeriod == "day") {

                let tripDay = objectTrips[i].date.slice(3, 5);
                
                if(tripDay == dd)
                {
                    dataSet.push(objectTrips[i].cost);
                    tripLabels.push((objectTrips[i].distance/1000).toFixed(1));
                }
            }
            else if (timePeriod == "year") {

                let tripYear = objectTrips[i].date.slice(6,10);

                if(tripYear == yyyy)
                {
                    if(yyyy > 1)
                    {

                    }
                    else
                    {
                        dataSet.push(objectTrips[i].cost);
                        tripLabels.push(objectTrips[i].date.slice(6,10));
                    }
                }
            }
        }
    }


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
        amountSpent = getTotalSpend();

    }).catch((err) => {
        console.log("error");
    })
}

/**
 * Draws the chart.
 */
async function drawChart(timePeriod) {
    createLabels(timePeriod);

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
              //  yAxisID:"y-axis"
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
                        text:"Kilometers Travelled",
                        color:"blue"
                    }  
                },
                x: {
                    beginAtZero: true,
                    title:{
                        display:true,
                        text:"Date of Trip",
                        color:"blue"
                    }  
                }
            }
        }
    });
}



function getTimePeriod() {

    let timePeriod       = $("#time-period").val()
    dataSet              = [];
    tripLabels           = [];
    let instances        = 0;
    let distance         = 0;
    let currentAmountCAD = 0 ;
    
    if(timePeriod == "day")
    {
        for(let i = 0; i < objectTrips.length; i++)
        {
            if(objectTrips[i].date != null)
            {
                if(objectTrips[i].date.slice(3, 5) == getDay())
                {
                    distance += (objectTrips[i].distance/1000);
    
                    for (let i = 0; i < objectTrips.length; i++) {
    
                        if (objectTrips[i].cost != null) {
    
                            currentAmountCAD += parseFloat(objectTrips[i].cost);
                        }
                    }

                    instances++;
                }
            }
            
        }
    }
    else if(timePeriod == "month")
    {
        for(let i = 0; i < objectTrips.length; i++)
        {
            if(objectTrips[i].date != null)
            {
                if(objectTrips[i].date.slice(0, 2) == getMonth())
                {
                    distance += (objectTrips[i].distance);
                    console.log(objectTrips[i].distance);

    
                    for (let i = 0; i < objectTrips.length; i++) {
    
                        if (objectTrips[i].cost != null) {
    
                            currentAmountCAD += parseFloat(objectTrips[i].cost);
                        }
                    }

                    instances++;
                }
            }
            
        }
    }
    else if(timePeriod == "year")
    {

    }


    let average = (currentAmountCAD / instances).toFixed(2);
    $("#trip-average").html(`You Spent: $${average}/Per Trip This Time Period.`)
    $("#distance-driven").html(`Total Distance: ${(distance/1000).toFixed(2)}KM`);
    $("#amount-spent").html(`Total Spend [CAD]: $${currentAmountCAD.toFixed(2)}`);

    myChart.destroy();
    drawChart(timePeriod);
}

async function setup() {

    await getUserData();
    $("#username").html(`Welcome, ${user.username[0].toUpperCase() + user.username.slice(1, user.username.length)}!`);
    let average = (amountSpent / objectTrips.length).toFixed(2);
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

$(document).ready(setup);