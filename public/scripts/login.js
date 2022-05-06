function proceedToHome(data){
    console.log("user found")
}

function checkUserExists(data) {
  
  if (data.length === 0) {
    console.log("User not found!");
    alert("User not found");
  } else {
    proceedToHome();
  }
}

function attemptLogin() {
    console.log("attemptLogin" + "got called!");
    console.log($("#username_log").val());
    console.log($("#password_log").val());
    $.ajax({
      url: "http://localhost:5000/attemptLogin",
    type: "POST",
    data: {
      username: $("#username_log").val(),
      password: $("#password_log").val(),
    },
    success: checkUserExists,
  });
  // resetPage();
}

function setup() {
    console.log("login.js loaded")
    $("#submit-button").on("click", attemptLogin);
 
  }
  
  $(document).ready(setup);
  
