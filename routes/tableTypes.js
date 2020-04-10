const express = require('express');
const router = express.Router();
const { getTableTypes } = require('../controllers/tableTypes.js');
const auth = require('../middleware/auth.js');

router.route('/').get(getTableTypes);

module.exports = router;
