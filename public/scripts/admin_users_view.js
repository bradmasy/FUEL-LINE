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
  
  for(let i = 0; i < data.length; i++)
  {
    let container = `<div>
                        ${data[i].username}
                    </div>`
    
    $("#users_table").append(container)
  }
  console.log(received_data);
  result = "<table id='user_table'>";
  result += "<tr>";
  for (field in data[0]) {
    if (field != "trips") {
      if (field != "_id") {
        if (field != "password") {
          if (field != "__v") {
            result += "<th>";
            result += field;
            result += "</th>";
          }
        }
      }
    }
  }
  result += "</tr>";
  for (i = 0; i < data.length; i++) {
    result += "<tr>";
    for (field in data[i]) {
      if (field != "trips") {
        if (field != "_id") {
          if (field != "password") {
            if (field != "__v") {
              result += "<td >";

              result += data[i][field];

              result += "</td>";
            }
          }
        }
      }
    }
    result += "</tr>";
  }

  
  result += "</table>";

  $("#users_table").html(result);
}

function displayUsersToAdmin() {
  // this function calls server.js to get the users in the database, then passes off data to populate_users
  console.log("displayUsersToAdmin got called");
  url = "/displayUsersToAdmin";
  $.ajax({
    url: "/displayUsersToAdmin",
    type: "POST",
    success: populate_users,
  });
}

function setup() {
  console.log("document ready");
  displayUsersToAdmin();
}

$(document).ready(setup);
