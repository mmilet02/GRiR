const express = require('express');
const router = express.Router();
const { addFloorPlan, getFloorPlans } = require('../controllers/floorPlans.js');

router
  .route('/')
  .post(addFloorPlan)
  .get(getFloorPlans);
module.exports = router;
