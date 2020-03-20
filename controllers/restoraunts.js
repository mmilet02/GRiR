const Restoraunts = require('../models/Restoraunts.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route   POST api/restoraunts
 * @desc    register new restoraunt
 * @access  public
 */
exports.postRestoraunt = async (req, res, next) => {
  const {
    Name,
    Email,
    Description,
    WorkingHours,
    RestorauntPage,
    Phone,
    MaxNumbOfSeats,
    MaxNumbOfTables,
    Password
  } = req.body;

  //Simple validation
  if (!Name || !Email || !WorkingHours || !Phone || !Password) {
    return res
      .status(400)
      .json({ msg: 'Please enter name, email,working hours and phone.' });
  }
  try {
    // Check for existing restoraunt

    const restoraunt = await Restoraunts.findOne({ Email });
    if (restoraunt) throw Error('Restoraunt already exists');

    //Create salt & hash

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(Password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newRestoraunt = new Restoraunts({
      Name,
      Email,
      Description,
      WorkingHours,
      RestorauntPage,
      Phone,
      MaxNumbOfSeats,
      MaxNumbOfTables,
      Password: hash
    });

    const savedRestoraunt = await newRestoraunt.save();
    if (!savedRestoraunt)
      throw Error('Something went wrong saving the restoraunt');

    const token = jwt.sign(
      { _id: savedRestoraunt._id },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      restoraunt: {
        _id: savedRestoraunt._id,
        name: savedRestoraunt.Name,
        email: savedRestoraunt.Email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
