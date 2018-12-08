// location bio experiences 
// authentication 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');

// load validation
const validateProfileInput = require('../../validation/profile');

// load profile model
const Profile = require('../../models/Profile');
// load user profile
const User = require('../../models/User')

// like res.send just with json
// router.get('/', (req, res) => res.json({msg: 'profile nbjhhjbjbj work'}))

// gets profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    // fetch the current users profile
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile found';
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))

});

// get all profile =s 

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile= 'no profiles found';
            return res.status(404).json(errors);
        }
        res.json(profiles);
        
    })
     .catch(err => res.status(404).json({profile: 'no profile'}));

});



// get by handle  
// api/profile/handle/:handle
// public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne ({ handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'no profile'
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))

});



// user/:user 
// get profile by user Id
router.get('/user/:user_id', (req, res) => {
    const error = {};

    Profile.findOne ({ user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'no profile'
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'no profile'}))

});






// private
// post a profile or edit a profile (same route)
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  
const { errors, isValid } = validateProfileInput(req.body);

if(!isValid){
    return res.status(400).json(errors);
}

    // get fields coming in from req.body
    // put into a object
    const profileFields = {}; // all form info goes in here 
    profileFields.user = req.user.id;//includes user model information

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.connections) profileFields.connections = req.body.connections;

    //skills need to be split into an array
    if (typeof req.body.skills != 'undefined') {
        profileFields.skills = req.body.skills.split(',');// array of skills
    }
    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profilelFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profilelFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profilelFields.social.twitter = req.body.twitter;


    
    
    //looo for profile of user 
    Profile.findOne({ user: req.user.id})
    .then(profile => {
        if(profile){
            // of there is a profile we are updating
            Profile.findOneAndUpdate(
                {user : req.user.id },
                {$set: profileFields},
                {new: true})
                .then(profile => res.json(profile))
        } else { 
            // check handle exist
            Profile.findOne({ handle: profileFields.handle})
            .then(profile => {
                if(profile){
                    errors.handle =' account does not exist';
                    res.status(400).json(errors)
                }

                // save profiel
                new Profile(profileFields).save()
                .then(profile => res.json(profile));
            });

        }
    }); 

});

// add experience post request 





module.exports = router;
