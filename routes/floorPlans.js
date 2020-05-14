const express = require('express');
const router = express.Router();
const {
  addFloorPlan,
  getFloorPlans,
  uploadImage,
} = require('../controllers/floorPlans.js');
const auth = require('../middleware/auth.js');

router.route('/').post(addFloorPlan);
router.route('/image').post(uploadImage);
router.route('/getFP').get(getFloorPlans);
module.exports = router;
