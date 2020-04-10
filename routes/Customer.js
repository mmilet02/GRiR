const express = require('express');
const router = express.Router();
const { postCustomer, getCustomers } = require('../controllers/customer.js');

router.route('/').post(postCustomer).get(getCustomers);

module.exports = router;
