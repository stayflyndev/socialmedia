// authentication 
const express = require('express');
const router = express.Router();
const User = require ('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


// like res.send just with json
// get the users
router.get('/test', (req, res) => res.json( {msg: 'users work'} ));

//create a new user. mongoose finds if the user exist. takes the user model 
//gets the user if there is one based on the email and returns the message, if not gets the user model to create a new user
// user is a param
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if(user){
            return res.status(400).json({ email: "Email exists"});
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
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
    // api/users/login 
    // will be returning the token
  
} );

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email}).then(user => {
        // checks user
    if(!user){
        return res.status(404).json({email: 'user not found'});
    }
    // check password plain txt against hast using compare method
    // bcrypt.compare(password, user.password)
    // .then(isMatch => {
    //     if(isMatch) {
    //         res.json({msg: 'success'});
    // } else {
    //     return res.staus(404).json({password: "pw exists"});
    // }
    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch){
            res.json({msg: "success"});
        }else{
    

    return res.status(400).json({password: "incorrect pw"});
        }
    })
})
})

module.exports = router;