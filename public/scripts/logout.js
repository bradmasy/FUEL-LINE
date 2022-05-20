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
