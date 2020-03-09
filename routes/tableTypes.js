const express = require('express');
const router = express.Router();
const { getTableTypes, addTableType } = require('../controllers/tableTypes.js');

router
  .route('/')
  .get(getTableTypes)
  .post(addTableType);

module.exports = router;
