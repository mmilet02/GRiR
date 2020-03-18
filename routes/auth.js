const express = require('express');
const router = express.Router();
const { loginRestoraunt, restorauntData } = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

router.route('/restoraunts').post(loginRestoraunt);
router
  .route('/restoraunts')
  .all(auth)
  .get(restorauntData);

module.exports = router;
