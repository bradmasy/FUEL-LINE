/**
 * Validation Utility Class
 */

/**
 * Constants
 */

 const EMPTY_INPUT = 0;
 const MIN_PASS = 8
 const MAX_PASS = 100
 const EXCEEDED_INPUT = 20
 
 function validatePassword(password) {
     let valid             = true;
     let expression_lower  = /[a-z]+/;
     let expression_upper  = /[A-Z]+/;
     let expression_number = /[0-9]+/;
     let expression_symbol = /[`~!@#$%^&*()_+<>?,./;':"[\]{}]+/;
 
     let lower  = expression_lower.exec(password);
     let upper  = expression_upper.exec(password);
     let number = expression_number.exec(password);
     let symbol = expression_symbol.exec(password);
 
     if (password === EMPTY_INPUT){
         valid = false;
         console.log("No Input found")
     }
 
     if (password > MAX_PASS){
         valid = false;
         console.log("Password is too long")
     }
 
     if (password < MIN_PASS){
         valid = false;
         console.log("Password is too short")
     }
 
     if(!(lower && upper && number && symbol)){
         valid = false;
         console.log("Password is too simple");
     }
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
     let expression = /[a-zA-Z0-9]+@[a-zA-Z0-9]+.[(com)|(ca)|(gov)|(edu)|(int)|(co)]+/;
     // x characters (any characters + @ + domain "hotmail" + ".com" or ".ca")
 
     let x = expression.exec(emailAddress);
     console.log(x);
     if (emailAddress.length === EMPTY_INPUT)
     {
         valid = false;
     }
 
     return valid
 }
 
 // validateEmail("1@hotmail.ca");
 
 
 function confirmPassword(password, confirmPassword)
 {
     if (password !== confirmPassword){
         valid = false;
         console.log("Passwords do not match")
     }
 
     return valid
 }
 
 confirmPassword("HELLO","Hello");
 
 // test expressions
 
 