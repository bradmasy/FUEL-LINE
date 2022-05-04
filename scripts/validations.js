/**
 * Validation Utility Class
 */

/**
 * Constants
 */

const EMPTY_INPUT = 0;
const EXCEEDED_INPUT = 20

function validatePassword(password) {
    let expression = /[a-z0-9A-Z]{8,12}/;

    let x = expression.exec(password);
    console.log(x);
}

// validatePassword("000111111");


function validateUserName(username){
    let valid = true;

    if(username.length === EMPTY_INPUT)
    {
        valid = false;
        console.log("No input found")
    }

    if(username.length === EXCEEDED_INPUT)
    {
        valid = false;
        console.log("Input length exceeded username parameters")
    }

    return valid

}

function validateEmail(emailAddress){
    let valid      = true;
    let expression = /[a-zA-Z0-9]+@[a-zA-Z0-9]+.[(com)|(ca)]+/;
    // x characters (any characters + @ + domain "hotmail" + ".com" or ".ca")

    let x = expression.exec(emailAddress);
    console.log(x);
    if (emailAddress.length === EMPTY_INPUT)
    {
        valid = false;
    }

    return valid
}

validateEmail("1@hotmail.ca");


function confirmPassword(password, confirmPassword)
{
    let valid = true;

    if (confirmPassword === EMPTY_INPUT)
    {
        valid = false;
        console.log("No Input found")
    }

    if (password !== confirmPassword)
    {
        valid = false;
        console.log("Passwords do not match")
    }

    return valid
}



// test expressions

