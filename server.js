// entry point file
// whats needed

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const keys = require('./config/keys');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// db config
const db = require('./config/keys').mongoURI

// connection to db successor throw error 
mongoose
.connect(db)
.then(() => console.log('connected'))
.catch(err => console.log(err));

//passport middleware

// passport config
require('./config/passport')(passport);




const port = process.env.PORT || 5000;
// route homepage req/res objects as params

// method to use the routes. anything after the route users whats specified
// middleware code between the request and response
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// use routes


app.listen(port, () => console.log(` server running on  ${port}` ))