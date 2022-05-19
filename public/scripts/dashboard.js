const chartCanvas = $("#chart");

let objectTrips = [];
let tripLabels  = [];
let dataSet     = [];
let user;
let totalDistance;


/**
 * Gets the total distance of the users trips.
 * 
 * @returns the total distance the user has travelled.
 */
 function getTotalDistance()
{
    let distance = 0;

    for(let i = 0; i < objectTrips.length;i++)
    {
        
        distance += objectTrips[i].distance;
        console.log(objectTrips[i].distance)
    }
    
    distance = (distance/1000).toFixed(2);
    
    return distance;
}

/**
 * Creates the labels for the graph based on the objects trip dates as globals (to avoid asynchronous issues).
 */
async function createLabels(){

    for(let i = 0; i < objectTrips.length; i++)
    {
        if(objectTrips[i].date != null)
        {
            tripLabels.push(objectTrips[i].date);
        }

        if(objectTrips[i].distance != null)
        {
            dataSet.push(objectTrips[i].distance);
        }
    }
}

/**
 * Asynchronously gets the users data to parse.
 */
async function getUserData()
{
   await fetch("/user-data").then((response) => {
        if(response.ok){
            return response.json();            
        } 
    }).then((object) => {
   
        user = object; // setting the global user.
        
        for(let i = 0; i < object.trips.length; i++)
        {
            objectTrips.push(object.trips[i]);
        }

        totalDistance =  getTotalDistance();

    }).catch((err) => {
        console.log("error");
    })
}

/**
 * Draws the chart.
 */
async function drawChart()
{
   createLabels();

    let myChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: tripLabels,
            datasets: [{
                label: "Date of Trip vs KM's Travelled",
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
                borderWidth: 1
            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




async function setup()
{
    
    await getUserData();
    $("#username").html(user.username);
    // totalDistance = getTotalDistance();
    console.log(totalDistance);
    $("#distance-driven").html(totalDistance);

    drawChart();
}

let $topBars =  $(".top-bar");
    
for(let i = 0; i < 4; i++)
{
    let $element = $($topBars[i]);
    if(i == 0)
    {
        $element.css("background-color","#FF912C");

    }
    console.log($element);
}




$(document).ready(setup);