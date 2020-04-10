const express = require('express');
const router = express.Router();
const { login, userData } = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

router.route('/').post(login);
router
  .route('/')
  .all(auth)
  .get(userData);

module.exports = router;
