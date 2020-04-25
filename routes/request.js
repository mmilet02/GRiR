const express = require('express');
const router = express.Router();
const {
  addRequest,
  getRequest,
  deleteRequest,
} = require('../controllers/request.js');
const auth = require('../middleware/auth.js');

router.route('/').all(auth).get(getRequest).delete(deleteRequest);
router.route('/addReq').post(addRequest);
module.exports = router;
