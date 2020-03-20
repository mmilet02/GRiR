const Restoraunts = require('../models/Restoraunts.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route   POST api/auth/restoraunt
 * @desc    Login restoraunt
 * @access  public
 */
exports.loginRestoraunt = async (req, res, next) => {
  const { Email, Password } = req.body;

  //Simple validation
  if (!Email || !Password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }
  try {
    // Check for existing restoraunt

    const restoraunt = await Restoraunts.findOne({ Email });
    if (!restoraunt) throw Error('Restoraunt does not exists');

    //Validate password

    const isMatch = await bcrypt.compare(Password, restoraunt.Password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ _id: restoraunt._id }, process.env.JWT_SECRET);

    res.json({
      token,
      restoraunt: {
        _id: restoraunt._id,
        Name: restoraunt.Name,
        Email: restoraunt.Email,
        Description: restoraunt.Description,
        WorkingHours: restoraunt.WorkingHours,
        RestorauntPage: restoraunt.RestorauntPage,
        Phone: restoraunt.Phone,
        MaxNumbOfSeats: restoraunt.MaxNumbOfSeats,
        MaxNumbOfTables: restoraunt.MaxNumbOfTables
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/**
 * @route   GET api/auth/restoraunt
 * @desc    GET restoraunt data
 * @access  private
 */
exports.restorauntData = async (req, res, next) => {
  try {
    const restoraunt = await Restoraunts.findById(req.restoraunt._id).select(
      '-Password'
    );
    if (!restoraunt) throw Error('Restoraunt Does not exist');
    res.json({ restoraunt });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
