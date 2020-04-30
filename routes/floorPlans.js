const express = require('express');
const router = express.Router();
const {
  addFloorPlan,
  getFloorPlans,
  downloadFloorPlan,
} = require('../controllers/floorPlans.js');
const auth = require('../middleware/auth.js');

router.route('/').post(addFloorPlan);

router.route('/getFP').get(getFloorPlans);
module.exports = router;
