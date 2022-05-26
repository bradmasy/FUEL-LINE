const NO_USERNAME      = 0;
const MIN_USERNAME_LEN = 5;

/**
 * Validation Utility Class
 */


/**
 * Validates the password.
 * 
 * @param {String} password represents a password.
 * @returns a boolean representing if a string has been validated or not.
 */
function validatePassword(password) {
    let valid             = false;
    let expressionCapital = /[A-Z]/;
    let expressionNumber  = /[0-9]/;
    let expressionLower   = /[a-z]/;

    if (password != null) 
    {
        let length = password.length;
        let exp1   = expressionCapital.exec(password);
        let exp2   = expressionNumber.exec(password);
        let exp3   = expressionLower.exec(password);
      
        if (exp1 != null && exp2 != null && exp3 != null && length >= 8) 
        {
            valid = true;
        }
    }

    return valid;
}

/**
 * Validates the email address.
 * 
 * @param {String} emailAddress represents an email address.
 * @returns a boolean representing if a string has been validated or not.
 */
function validateEmail(emailAddress){
    let valid = false;

    if(emailAddress != null)
    {
        let localUsername = /[a-zA-Z0-9]+@/ //match everything from the before and the @
        let domain        = /[a-z]+[\.](com|ca)/;
        let exp1          = localUsername.exec(emailAddress);
        let exp2          = domain.exec(emailAddress);
        
        if(exp1 != null && exp2 != null)
        {
            valid = true;
        }
    }
   
    return valid;
}

/**
 * Validates the username.
 * 
 * @param {String} username represents a users username.
 * @returns  a boolean representing if a string has been validated or not.
 */
function validateUsername(username) {
    let valid = false;

    console.log(`\"${username}\"`);
    if(username != null)
    {
        if (username.length === NO_USERNAME || username.length < MIN_USERNAME_LEN) {
            console.log("bad username");
            valid = false;
        }
        else
        {
            valid = true;
            console.log("good username");
        }
    }
   
    return valid;
}

/**
 * Checks to see that the password and second password entered are the same.
 * 
 * @param {String} password represents a user password.
 * @param {String} comparisonPassword represents a second user password.
 * @returns  a boolean representing if a string has been validated or not.
 */
function samePassword(password, comparisonPassword)
{
    let valid = false;

    if(password === comparisonPassword)
    {
        valid = true;
    }
    return valid;
}


/**
 * Calls all test functions on all the users data passed.
 * 
 * @param {*} username represents a users username.
 * @param {*} password represents a user password.
 * @param {*} emailAddress represents an email address.
 * @param {*} passwordCopy represents a second user password.
 * @returns  a boolean representing if a string has been validated or not.
 */
function passTests(username, password,emailAddress,passwordCopy) 
{
    let valid = false;
 
    if(validateUsername(username) &&
       validatePassword(password) && 
       validateEmail(emailAddress) && 
       samePassword(password,passwordCopy))
    {
        valid = true;
    }

    return valid;

}

