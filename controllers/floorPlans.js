const FloorPlans = require('../models/FloorPlans.js');

const addTable = async temp => {
  return await Tables.create(temp);
};
//@desc Get all floor plans
//@route GET /api/floorPlans
//access public
exports.getFloorPlans = async (req, res, next) => {
  try {
    const floorPlan = await FloorPlans.find();
    return res.status(200).json({
      success: true,
      data: floorPlan,
      count: floorPlan.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
// @desc    Add floor plan
// @route   POST /api/v1/floorPlans
// @access  Public
exports.addFloorPlan = async (req, res, next) => {
  console.log('uslooo');

  try {
    const floorPlan = await FloorPlans.create(req.body);

    return res.status(201).json({
      success: true,
      data: floorPlan
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};
