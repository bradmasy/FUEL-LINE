
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


