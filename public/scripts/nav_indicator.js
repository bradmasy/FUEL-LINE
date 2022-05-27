
function setup() {
$('.nav-buttons').on("click", function() {
    $(this).triggerHandler("focus");
})}
  
  $(document).ready(setup);