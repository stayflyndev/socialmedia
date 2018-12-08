const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema.  what fields do we want?
const ProfileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, //associate user by the iD, unique 
        ref: 'users', // ref the collection db User
     },
     handle: {
         type: String,
         required: true,
         max: 40
     },
     company:{
         type: String
     }, 
     website: {
         type: String
     },
     location: {
         type: String
     },
     status:{
         type: String,
         required: true
     },
     skills: {
         type: [String],
         required: true
     },
     bio: {
         type: String,
     },
     connections:{
         type: String
     },
     experience: [
         {
             title: { type: String, required: true
                    },
         
            company: { type: String, required: true
                    },
        
            location: { type: String, required: true
                    },
            
            from: { type: String, required: true
                    },
            to: { type: Date},
            current: { description: String}
            
         }
                    ],
    education: [
         {
             school: { type: String, required: true
                    },
         
            degree: { type: String, required: true
                    },
        
            fieldofstudy: { type: String, required: true
                    },
            
            from: { type: String, required: true
                    },
            to: { type: Date},
            current: { description: String}
            
         }
                    ],

        socialmedia: {
            youtube : { type: String },
            twiter : { type: String },
            linkedin : { type: String },
            facebook : { type: String },
        },
        date:{
            type: Date,
            default: Date.now
        }
      

})


module.exports = Profile = mongoose.model('profile', ProfileSchema);