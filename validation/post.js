const Validator = require('validator');
const isEmpty =require('./is-empty');

module.exports =  function validatePostInput(data) {
    let errors ={};

data.text = !isEmpty(data.text) ? data.text : '';

if(!Validator.isLength(data.text, {min:10, max: 30})){
    errors.text = " post must be bewteen 10 -30";
}

  if(Validator.isEmpty(data.text)){
    errors.text ='text required';
 }




 
 return {
     errors,
     isValid: isEmpty(errors)
 };
};
// errors is an obj