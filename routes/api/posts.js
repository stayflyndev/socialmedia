// authentication 
const express = require('express');
const router = express.Router();

// like res.send just with json
router.get('/', (req, res) => res.json({msg: 'posts work'}))

module.exports = router;