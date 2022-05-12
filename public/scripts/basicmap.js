let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map-section"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


      window.initMap = initMap;




  function setup()
  {
    initMap();
      let $topBars =  $(".top-bar");
      // $topBars[3].css("background-color","black");
      for(let i = 0; i < 4; i++)
      {
          let $element = $($topBars[i]);
          if(i == 3)
          {
              $element.css("background-color","black");
  
          }
          console.log($element);
      }
      




  }
  

  $(document).ready(setup);


  
