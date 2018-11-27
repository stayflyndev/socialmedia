// authentication 
const express = require('express');
const router = express.Router();
const User = require ('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Load input validation 
const validateRegistrationInput = require('../../validation/registration');

const validateLoginInput = require('../../validation/login');



// like res.send just with json
// get the users
router.get('/test', (req, res) => res.json( {msg: 'users work'} ));

//create a new user. mongoose finds if the user exist. takes the user model 
//gets the user if there is one based on the email and returns the message, if not gets the user model to create a new user
// user is a param
router.post('/register', (req, res) => {

const { errors, isValid } = validateRegistrationInput(req.body);
if(!isValid){
    return res.status(400).json(errors);
}


    User.findOne({ email: req.body.email }).then(user => {
        if(user){
            errors.email = 'exits'
            return res.status(400).json(errors);
        } else {

            const avatar = gravatar.url(req.body.email, {
             s: '200', //size
             r: 'pg',
             d: 'mm'  //defualt

            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            }); 
             
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err)throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
   
  
} );


 //route to login api/users/login 
// will be returning the token

router.post('/login', (req, res) => {


    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email}).then(user => {
        // checks user
    if(!user){
        errors.email= 'user not found'
        return res.status(401).json(errors);
    }

    // checks the password is correct or not
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(isMatch){

            // create payload
            const payload ={
                id: user.id,
                name: user.name,
                avater: user.avater
            }

            // send the json web token
            // user information
            jwt.sign(
                payload, 
                keys.secrectOrKey,
                { expiresIn: 3600},
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                }

            );
            
        }else{
            errors.pawword ="incorrect password"
         return res.status(400).json(errors);
        }
    });
});
});

// jwt information
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
     res.json({
         name: req.user.name,
         email: req.user.email
     });
}
)

module.exports = router;