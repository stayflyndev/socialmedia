const Validator = require('validator');
const isEmpty =require('./is-empty');

module.exports =  function validateRegistrationInput(data) {
    let errors ={};

data.name = !isEmpty(data.name) ? data.name : '';
data.email = !isEmpty(data.email) ? data.email : '';
data.password = !isEmpty(data.password) ? data.password : '';
data.password2 = !isEmpty(data.password2) ? data.password2 : '';



 if(!Validator.isLength(data.name, {min: 2, max: 30})){
     errors.name = 'Must be valid characters'
 }

 if(Validator.isEmpty(data.name)){
     errors.name ='Name required';
  }

  if(Validator.isEmpty(data.email)){
    errors.email ='Email required';
 }

 if(!Validator.isEmail(data.email)){
    errors.email ='Email Invalid';
 }

 if(Validator.isEmpty(data.password)){
    errors.password ='password required';
 }


 if(!Validator.isLength(data.password, {min:6, max:30})){
    errors.password ='passsword must be 6 - 30';
 }


 if(Validator.isEmpty(data.password2)){
    errors.password2 ='Name required';
 }

 if(!Validator.equals(data.password, data.password2)){
    errors.password2 ='must match';
 }

 return {
     errors,
     isValid: isEmpty(errors)
 }
}
// errors is an object

