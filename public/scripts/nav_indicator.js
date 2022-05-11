
function setup() {
$('.nav-buttons').on("click", function() {
    console.log("nav clicked");
    $(this).triggerHandler("focus");
})}
  
  $(document).ready(setup);