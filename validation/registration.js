const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports =  function validateRegistrationInput(data) {
    let errors ={};



 if(!Validator.isLength(data.name, {min: 2, max: 30})){
     errors.name = 'Must be valid characters'
 }
 return {
     errors,
     isValid: isEmpty(errors)
 }
}
// errors is an object

