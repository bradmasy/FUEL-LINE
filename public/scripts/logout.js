let LOGOUT_CALL=0
function logout_open(){
    if (LOGOUT_CALL==0){
      $(".logout-contain").animate({width:'toggle'},500);
      LOGOUT_CALL=1
  
    }
    else {
      $(".logout-contain").animate({width:'toggle'},500);
      LOGOUT_CALL=0
    }}

function setup(){
    $("#header-logo").on("click", logout_open);
}


function setup()
{
  for (let i = 0; i < 4; i++) {
    let $element = $($topBars[i]);
    if (i == 3) {
      $element.css("background-color", "#FF912C");
    }
  }
}


$(document).ready(setup)
