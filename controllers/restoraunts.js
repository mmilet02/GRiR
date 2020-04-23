const Restoraunts = require('../models/Restoraunts.js');
const Customer = require('../models/Customer.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fileUpload = require('express-fileupload');

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
    Type,
    Location,
    StartingHour,
    EndingHour,
    RestorauntPage,
    Phone,
    Viewes,
    ImgName,
    Password,
  } = req.body;

  //Simple validation
  if (!Name || !Email  || !Phone || !Password) {
    return res
      .status(400)
      .json({ msg: 'Please enter name, email and phone.' });
  }
  try {
    // Check for existing restoraunt

    const restoraunt = await Restoraunts.findOne({ Email });
    const customer = await Customer.findOne({ Email });
    if (restoraunt || customer) throw Error('Restoraunt already exists');

    //Create salt & hash

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(Password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newRestoraunt = new Restoraunts({
      Name,
      Email,
      Description,
      Type,
      Location,
      StartingHour,
      EndingHour,
      RestorauntPage,
      Phone,
      Viewes,
      ImgName,
      Password: hash,
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
        Name: savedRestoraunt.Name,
        Email: savedRestoraunt.Email,
        Description: savedRestoraunt.Description,
        Type: savedRestoraunt.Type,
        Location: savedRestoraunt.Location,
        StartingHour: savedRestoraunt.StartingHour,
        EndingHour: savedRestoraunt.EndingHour,
        RestorauntPage: savedRestoraunt.RestorauntPage,
        Phone: savedRestoraunt.Phone,
        Viewes: savedRestoraunt.Viewes,
        ImgName: savedRestoraunt.ImgName,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

//@desc Get all restoraunts
//@route GET /api/restoraunts
//access public
exports.getRestoraunts = async (req, res, next) => {
  try {
    const restoraunt = await Restoraunts.find();
    return res.status(200).json({
      success: true,
      data: restoraunt,
      count: restoraunt.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

//@desc Upload resto image
//@route POST /api/restoraunts/image
//access public
exports.uploadImage = async (req, res, next) => {
  if (req.files === null)
    return res.status(400).json({ msg: 'No file uploaded.' });
  try {
    const file = req.files.file;
    let pathFile = path.join(`${__dirname}`, '../');
    console.log(pathFile);
    await file.mv(
      `C:/Users/KORISNIK/Desktop/MARIN/DIPLOMSKI/grir/client/public/uploads/${file.name}`
    );

    res
      .status(200)
      .json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
