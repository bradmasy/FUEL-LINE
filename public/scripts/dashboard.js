const chartCanvas = $("#chart");





function drawChart()
{

    let myChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: [
            '12:00am',
            '1:00am',
            '2:00am',
            '3:00am', 
            '4:00am',
            '5:00am',
            '6:00am',
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am",
            "2:00am"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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




function setup()
{
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