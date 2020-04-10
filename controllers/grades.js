const Grades = require('../models/Grades.js');

//@desc Post grade
//@route POST /api/grades/addG
//access private
exports.addGrade = async (req, res, next) => {
  try {
    const grades = await Grades.create(req.body);

    return res.status(201).json({
      success: true,
      data: grades,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

//@desc GET grades
//@route GET /api/grades/getG
//access public
exports.getGrades = async (req, res, next) => {
  try {
    const grades = await Grades.find();

    return res.status(200).json({
      success: true,
      data: grades,
      count: grades.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
