const NO_USERNAME      = 0;
const MIN_USERNAME_LEN = 5;


/**
 * Validation Utility Class
 */

function validatePassword(password) {
    let valid             = false;
    let expressionCapital = /[A-Z]/;
    let expressionNumber  = /[0-9]/;
    let expressionLower   = /[a-z]/;

    
    if (password != null) {
        let length = password.length;
        let exp1 = expressionCapital.exec(password);
        let exp2 = expressionNumber.exec(password);
        let exp3 = expressionLower.exec(password);
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);


        if (exp1 != null && exp2 != null && exp3 != null && length >= 8) {
            console.log("good password");
            valid = true;
        }
    }
    else {
        console.log("bad pass")
    }

    return valid;
}

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
    else 
    {
        console.log("bad email address");
    }

    return valid;
}



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

function samePassword(password, comparisonPassword)
{
    let valid = false;

    if(password === comparisonPassword)
    {
        valid = true;
    }
    return valid;
}



function passTests(username, password,emailAddress,passwordCopy) {
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

