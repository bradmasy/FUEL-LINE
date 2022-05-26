/**
 * Logout Javascript.
 * 
 * @version 1.0
 * @name: Fuel Line LTD
 */

/**
 * Variables.
 */

function populate_users(data) {
// this function takes the data and puts it table in the users_table div
  received_data = data;

  result = "<div id='user_table'>";

  for (i = 0; i < data.length; i++) {
    result += "<table style='overflow-x: auto; display: block;'>";
    result += "<tr>";

    for (field in data[i]) {
      result += "<th>";
      result += field;
      result += "</th>";
    }
    result += "</tr>";
    result += "<tr>";
    for (field in data[i]) {
      result += "<td style='overflow: hidden; text-overflow: ellipsis; word-wrap: break-word;'>";

      result += data[i][field];

      result += "</td>";
    }

    result += "<tr>";
    result += "</table>";
    result += "</div>"
  }

  $("#users_table").html(result);
}

function displayUsersToAdmin() {
  // this function calls server.js to get the users in the database, then passes off data to populate_users
  console.log("displayUsersToAdmin got called");
  url = "http://localhost:5000/displayUsersToAdmin";
  $.ajax({
    // url: "http://localhost:5000/findUnicornByWeight",
    url: "http://localhost:5000/displayUsersToAdmin",
    type: "POST",
    success: populate_users,
  });

}

function setup() {
  console.log("document ready");
  displayUsersToAdmin();
}

$(document).ready(setup);
