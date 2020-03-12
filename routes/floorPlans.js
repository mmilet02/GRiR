const express = require('express');
const router = express.Router();
const { addFloorPlan } = require('../controllers/floorPlans.js');

router.route('/').post(addFloorPlan);
module.exports = router;
