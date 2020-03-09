const TableTypes = require('../models/TableTypes.js');

//@desc Get all table types
//@route GET /api/tableTypes
//access public
exports.getTableTypes = async (req, res, next) => {
  try {
    const tableTypes = await TableTypes.find();
    return res.status(200).json({
      success: true,
      data: tableTypes,
      count: tableTypes.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTableType = async (req, res, next) => {
  try {
    const { imageName, tableType, sizeX, coordX, coordY } = req.body;

    const tableTypes = await TableTypes.create(req.body);

    return res.status(201).json({
      success: true,
      data: tableTypes
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
