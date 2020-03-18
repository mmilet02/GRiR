const express = require('express');
const router = express.Router();
const { postRestoraunt } = require('../controllers/restoraunts.js');

router.route('/').post(postRestoraunt);

module.exports = router;
