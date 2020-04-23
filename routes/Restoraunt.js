const express = require('express');
const router = express.Router();
const {
  postRestoraunt,
  getRestoraunts,
  uploadImage,
} = require('../controllers/restoraunts.js');

router.route('/').post(postRestoraunt).get(getRestoraunts);

router.route('/image').post(uploadImage);

module.exports = router;
