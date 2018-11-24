const mongoose = require('mongoose');
const schema = mongoose.Schema;


// create schema.  what fields do we want?
const UserSchema = new Schema ({
name:
 { type : String, 
required: true },
email:
 { type : String, 
required: true },
password:
 { type : String, 
required: true },
avatar:
 { type : String, 
required: true },
date:
 { type : Date, 
default: date.now },

});

module.exports = User = mongoose.model('users', UserSchema);