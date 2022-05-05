//---Displays all users registered for the application---//

//To-Do: put users in table with relevant info(not password)

function populate_users(data) {
// this function takes the data and puts it table in the users_table div
  received_data = data;
  console.log(data);

  result = "";

  for (i = 0; i < data.length; i++) {
    result += "<table>";
    result += "<tr>";

    for (field in data[i]) {
      result += "<th>";
      result += field;
      result += "</th>";
    }
    result += "</tr>";
    result += "<tr>";
    for (field in data[i]) {
      result += "<td>";

      result += data[i][field];

      result += "</td>";
    }

    result += "<tr>";
    result += "</table>";
  }

  $("#users_table").html(result);
}

function displayUsersToAdmin() {
  // this function calls server.js to get the users in the database, then passes off data to populate_users
  console.log("displayUsersToAdmin got called");
  url = "http://localhost:5000/displayUsersToAdmin";
  data = username;
  $.get(url, function (data) {
    success: populate_users;
  });
  resetPage();
  $("#filters").show();
}

function setup() {
  console.log("document ready");
  displayUsersToAdmin;
}

$(document).ready(setup);
