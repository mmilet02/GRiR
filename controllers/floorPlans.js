const FloorPlans = require('../models/FloorPlans.js');
const Tables = require('../models/Tables.js');

const addTable = async temp => {
  return await Tables.create(temp);
};
//@desc Get all floor plans
//@route GET /api/floorPlans
//access public
exports.getFloorPlans = async (req, res, next) => {
  try {
    const floorPlan = await FloorPlans.find();
    const tables = await Tables.find();
    return res.status(200).json({
      success: true,
      data: floorPlan,
      data: tables,
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
  try {
    let temp = {
      restaurantID: 2,
      numbOfTables: req.body.tableList.length
    };

    const floorPlan = await FloorPlans.create(temp);
    const tableListt = await Promise.all(
      req.body.tableList.map(tab => {
        let temp2 = {
          floorID: floorPlan._id,
          coordX: tab.coordX,
          coordY: tab.coordY,
          imageName: tab.imageName,
          sizeX: tab.sizeX,
          tableType: tab.tableType
        };

        return addTable(temp2);
      })
    );

    return res.status(201).json({
      success: true,
      data: floorPlan,
      data2: tableListt
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
