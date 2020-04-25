const Request = require('../models/Request.js');

/**
 * @route   POST api/request/addReq
 * @desc    add new request
 * @access  public
 */
exports.addRequest = async (req, res, next) => {
  try {
    const request = await Request.create(req.body);

    return res.status(201).json({
      success: true,
      data: request,
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

//@desc Get all request
//@route GET /api/request
//access private
exports.getRequest = async (req, res, next) => {
  try {
    const request = await Request.find();
    return res.status(200).json({
      success: true,
      data: request,
      count: request.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

//@desc Delete  request
//@route DELETE /api/request
//access private
exports.deleteRequest = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const request = await Request.findOne({ _id });
    if (!request) throw Error('No request found');

    const removed = await request.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the request');

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
