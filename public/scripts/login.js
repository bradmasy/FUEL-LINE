
let isAdmin = false;

function proceedToHome(data){
    console.log(data)
    console.log("successful login")
    if (isAdmin) {
      window.location.href ="/admin_user_views.html"
    } else {
      window.location.href ="/success.html"
    }
}


function attemptLogin() {
    console.log("attemptLogin" + "got called!"); 
    console.log($("#username_log").val());
    console.log($("#password_log").val());
    $.ajax({
      url: "http://localhost:5000/attemptLogin",
    //   url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
      type: "POST",
      data: {
        username: $("#username_log").val(),
        password: $("#password_log").val(),
      },
      success: proceedToHome,
    });
    // resetPage();
  }


function setup() {
    console.log("login.js loaded")
    $("#submit-button").on("click", attemptLogin);
 
  }
  
  $(document).ready(setup);