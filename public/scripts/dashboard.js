const chartCanvas = $("#chart");

let objectTrips = [];
let tripLabels  = [];
let dataSet     = [];
let user;
let totalDistance;


function getTotalDistance()
{
    let totalDistance = 0;

    for(let i = 0; i < objectTrips.length;i++)
    {
        totalDistance += objectTrips[i].distance;
        console.log( objectTrips[i].distance);

    }
    console.log(totalDistance);
    totalDistance = (totalDistance/1000).toFixed(2);
    return totalDistance;
}

/**
 * Creates the labels for the graph based on the objects trip dates.
 */
async function createLabels(){

    for(let i = 0; i < objectTrips.length; i++)
    {
        tripLabels.push(objectTrips[i].date);
        dataSet.push(objectTrips[i].distance);
        
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
        console.log(object);
        console.log(object.trips);

        user = object;
        
        for(let i = 0; i < object.trips.length; i++)
        {
            objectTrips.push(object.trips[i]);
            // tripLabels.push(object.trips[i].date);
        }
        getTotalDistance();


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
    console.log(user);
    totalDistance = getTotalDistance;
    $("#distance-driven").html(totalDistance);

    drawChart();
}






$(document).ready(setup);