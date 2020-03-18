const express = require('express');
const router = express.Router();
const { addFloorPlan, getFloorPlans } = require('../controllers/floorPlans.js');
const auth = require('../middleware/auth.js');

router
  .route('/')
  .all(auth)
  .post(addFloorPlan);

router.route('/').get(getFloorPlans);
module.exports = router;
