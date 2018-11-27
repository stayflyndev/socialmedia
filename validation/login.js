const Validator = require('validator');
const isEmpty =require('./isEmpty');

module.exports =  function validateLoginInput(data) {
    let errors ={};

data.email = !isEmpty(data.email) ? data.email : '';
data.password = !isEmpty(data.password) ? data.password : '';



  if(Validator.isEmpty(data.email)){
    errors.email ='Email required';
 }

 if(!Validator.isEmail(data.email)){
    errors.email ='Email Invalid';
 }

 if(Validator.isEmpty(data.password)){
    errors.password ='password required';
 }



 
 return {
     errors,
     isValid: isEmpty(errors)
 }
}
// errors is an object

