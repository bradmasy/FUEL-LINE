/**
 * Validation Utility Class
 */

function validatePassword(password) {
    let expression = /[A-Z]+/;

    let x = expression.exec(password);
    console.log(x);
}


// test expressions

validatePassword("Hello");
