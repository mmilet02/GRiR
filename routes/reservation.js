const express = require('express');
const router = express.Router();
const {
  addReservation,
  getReservation,
} = require('../controllers/reservation.js');
const auth = require('../middleware/auth.js');

router.route('/').all(auth).post(addReservation);
router.route('/getR').get(getReservation);

module.exports = router;
