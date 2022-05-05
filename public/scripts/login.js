
const $loginButton = $("#submit-button");
let $userInput     = $("#username-log");
let $passInput     = $("#password-log");

console.log($userInput);
function getUserData()
{
    let username = $userInput.val();
    let password = $passInput.val(); 
    console.log(username);
    console.log(password);
}


$loginButton.on("click", () => {
    console.log("working");
    getUserData();
})


function attemptLogin() {
    console.log("attemptLogin" + "got called!");
    console.log($("#userInput").val());
    console.log($("#passInput").val());
    $.ajax({
      url: "http://localhost:5000/attemptLogin",
    //   url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
      type: "POST",
      data: {
        lowerWeight: $("#userInput").val(),
        higherWeight: $("#passInput").val(),
      },
      success: process_res,
    });
    resetPage();
    $("#filters").show();
  }


function setup() {
    $("submit-button").on("click", attemptLogin);
 
  }
  
  $(document).ready(setup);