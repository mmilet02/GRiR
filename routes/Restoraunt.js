const express = require('express');
const router = express.Router();
const {
  postRestoraunt,
  getRestoraunts,
  uploadImage,
  updateValidateBy,
  turnOnOffValidateBy,
} = require('../controllers/restoraunts.js');

router.route('/').post(postRestoraunt).get(getRestoraunts);

router.route('/image').post(uploadImage);
router.route('/ValidatedBy').post(updateValidateBy);
router.route('/OnOff').post(turnOnOffValidateBy);

module.exports = router;
