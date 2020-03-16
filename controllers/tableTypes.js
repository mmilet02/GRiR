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
