const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =  function validateProfileInput(data) {
    let errors ={};

data.handle = !isEmpty(data.handle) ? data.handle : '';
data.status = !isEmpty(data.status) ? data.status : '';
data.skills = !isEmpty(data.skills) ? data.skills : '';


    if(!Validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = 'handle needs to be 2 - 4 characters';
    }
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'handle is required';
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'status required';
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = 'skills required';
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'not valid url';
        }
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'not valid url ';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'not valid url ';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'not valid url ';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'not valid url ';
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'not valid url ';
        }
    }


 
 return {
     errors,
     isValid: isEmpty(errors)
 };
};
// errors is an obj