const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {
  postCustomer,
  getCustomers,
  updateFavorite,
} = require('../controllers/customer.js');

router.route('/').post(postCustomer).get(getCustomers);
router.route('/fav').all(auth).post(updateFavorite);

module.exports = router;
