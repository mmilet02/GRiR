const Restoraunts = require('../models/Restoraunts.js');
const Customer = require('../models/Customer.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fileUpload = require('express-fileupload');

/**
 * @route   POST api/restoraunts/ValidatedBy
 * @desc    update validateBy
 * @access  public
 */
exports.updateValidateBy = async (req, res, next) => {
  const { _id, ValidatedBy } = req.body;
  const restoraunt = await Restoraunts.findOne({ _id });
  restoraunt.ValidatedBy = ValidatedBy;
  restoraunt.save();
  return res.status(200).json({
    restoraunt: {
      _id: restoraunt._id,
      Name: restoraunt.Name,
      Email: restoraunt.Email,
      Description: restoraunt.Description,
      Type: restoraunt.Type,
      Location: restoraunt.Location,
      StartingHour: restoraunt.StartingHour,
      EndingHour: restoraunt.EndingHour,
      RestorauntPage: restoraunt.RestorauntPage,
      Phone: restoraunt.Phone,
      Viewes: restoraunt.Viewes,
      ImgName: restoraunt.ImgName,
      TableList: restoraunt.TableList,
      FloorPlanImgName: restoraunt.FloorPlanImgName,
      ValidatedBy: restoraunt.ValidatedBy,
    },
  });
};

/**
 * @route   POST api/restoraunts/OnOff
 * @desc    update validateBy
 * @access  public
 */
exports.turnOnOffValidateBy = async (req, res, next) => {
  const { _id, OnOff } = req.body;
  const restoraunt = await Restoraunts.findOne({ _id });
  restoraunt.ValidatedBy = OnOff;
  restoraunt.save();
  return res.status(200).json({
    restoraunt: {
      _id: restoraunt._id,
      Name: restoraunt.Name,
      Email: restoraunt.Email,
      Description: restoraunt.Description,
      Type: restoraunt.Type,
      Location: restoraunt.Location,
      StartingHour: restoraunt.StartingHour,
      EndingHour: restoraunt.EndingHour,
      RestorauntPage: restoraunt.RestorauntPage,
      Phone: restoraunt.Phone,
      Viewes: restoraunt.Viewes,
      ImgName: restoraunt.ImgName,
      TableList: restoraunt.TableList,
      FloorPlanImgName: restoraunt.FloorPlanImgName,
      ValidatedBy: restoraunt.ValidatedBy,
    },
  });
};

/**
 * @route   POST api/restoraunts
 * @desc    register new restoraunt
 * @access  public
 */
exports.postRestoraunt = async (req, res, next) => {
  console.log('step 1');
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
    TableList,
    FloorPlanImgName,
    ValidatedBy,
    Password,
  } = req.body;

  //Simple validation
  if (
    !Name ||
    !Email ||
    !Phone ||
    !Password ||
    !Description ||
    !Type ||
    !Location ||
    !StartingHour ||
    !EndingHour ||
    !RestorauntPage ||
    ImgName === 'Niste izabrali sliku' ||
    TableList.length == 0 ||
    FloorPlanImgName === 'Niste izabrali tlocrt'
  ) {
    return res.status(400).json({ msg: 'Niste unijeli sva polja' });
  }
  try {
    // Check for existing restoraunt
    console.log('step 2');
    const restoraunt = await Restoraunts.findOne({ Email });
    const customer = await Customer.findOne({ Email });
    if (restoraunt || customer) throw Error('User already exists');

    //Create salt & hash

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');
    console.log('step 3');
    const hash = await bcrypt.hash(Password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');
    console.log('step 4');
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
      TableList,
      FloorPlanImgName,
      ValidatedBy,
      Password: hash,
    });

    const savedRestoraunt = await newRestoraunt.save();
    if (!savedRestoraunt)
      throw Error('Something went wrong saving the restoraunt');
    console.log('step 5');
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
        TableList: savedRestoraunt.TableList,
        FloorPlanImgName: savedRestoraunt.FloorPlanImgName,
        ValidatedBy: savedRestoraunt.ValidatedBy,
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
    const file1 = req.files.file1;
    let pathFile2 = path.join(`${__dirname}`, '../');
    await file1.mv(
      `C:/Users/KORISNIK/Desktop/MARIN/DIPLOMSKI/grir/client/public/uploads/${file1.name}`
    );

    const file2 = req.files.file2;
    let pathFile1 = path.join(`${__dirname}`, '../');
    await file2.mv(
      `C:/Users/KORISNIK/Desktop/MARIN/DIPLOMSKI/grir/client/public/uploads/${file2.name}`
    );

    res.status(200).json({
      fileName1: file1.name,
      filePath1: `/uploads/${file1.name}`,
      fileName2: file2.name,
      filePath2: `/uploads/${file2.name}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
