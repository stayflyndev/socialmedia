// entry point file
// whats needed

const express = require('express');
const mongoose = require('mongoose');

users = require('./routes/api/users');
profile = require('./routes/api/profile');
posts = require('./routes/api/posts');


const app = express();
// db config
const db = require('./config/keys').mongoURI

// connection to db successor throw error 
mongoose
.connect(db)
.then(() => console.log('connected'))
.catch(err => console.log(err));

// // 

const port = process.env.PORT || 5000;
// route homepage req/res objects as params
app.get('/', (req, res) => res.send('coding all niggght'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// use routes


app.listen(port, () => console.log(` server running on  ${port}` ))