const express = require('express');
const router = express.Router();
const {
  postRestoraunt,
  getRestoraunts
} = require('../controllers/restoraunts.js');

router
  .route('/')
  .post(postRestoraunt)
  .get(getRestoraunts);

module.exports = router;
