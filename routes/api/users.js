// authentication 
const express = require('express');
const router = express.Router();
const User = require ('../../models/User');
// like res.send just with json
// get the users
router.get('/', (req, res) => res.json( {msg: 'users work'} ));

//create a new user
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            return res.status(400).json({ email: "Email exists"})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.passowrd
            })
        }
    })
} );

module.exports = router;