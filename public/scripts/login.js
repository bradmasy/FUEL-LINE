


function proceedToHome(data){
    console.log(data)
    console.log("successful login")
    window.location.href ="/admin_user_views.html"
}


function attemptLogin() {
<<<<<<< HEAD
    console.log("attemptLogin" + "got called!");
  
=======
    console.log("attemptLogin" + "got called!"); 
    console.log($("#username_log").val());
    console.log($("#password_log").val());
>>>>>>> c1f17918912cf01f9d3f015d0b6451fcc3541ff3
    $.ajax({
      url: "http://localhost:5000/attemptLogin",
    //   url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
      type: "POST",
      data: {
<<<<<<< HEAD
        username: $("#username-log").val(),
        password: $("#password-log").val(),
=======
        username: $("#username_log").val(),
        password: $("#password_log").val(),
>>>>>>> c1f17918912cf01f9d3f015d0b6451fcc3541ff3
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