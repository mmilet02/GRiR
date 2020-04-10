const express = require('express');
const router = express.Router();
const { addGrade, getGrades } = require('../controllers/grades.js');
const auth = require('../middleware/auth.js');

router.route('/addG').all(auth).post(addGrade);
router.route('/getG').get(getGrades);
module.exports = router;
