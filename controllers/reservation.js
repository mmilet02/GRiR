const Reservation = require('../models/Reservation.js');

// @desc    Add reservation
// @route   POST /api/reservation
// @access  Private
exports.addReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.create(req.body);

    return res.status(201).json({
      success: true,
      data: reservation,
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

// @desc    Get reservations
// @route   GET /api/reservation/getR
// @access  Public
exports.getReservation = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    return res.status(200).json({
      success: true,
      data: reservations,
      count: reservations.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
