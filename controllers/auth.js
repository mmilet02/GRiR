const Restoraunts = require('../models/Restoraunts.js');
const Customer = require('../models/Customer.js');
const Admin = require('../models/Admin.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route   POST api/auth
 * @desc    Login user
 * @access  public
 */
exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;

  //Simple validation
  if (!Email || !Password) {
    return res.status(400).json({ msg: 'Niste unijeli sva polja.' });
  }
  try {
    // Check for existing restoraunt
    if (Email === 'admin') {
      const admin = await Admin.findOne({ Email });
      if (!admin) throw Error('Korisnik sa tim e-mailom nepostoji');

      const isMatch = await bcrypt.compare(Password, admin.Password);
      if (!isMatch) throw Error('Password is not correct');

      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

      res.json({
        token,
        admin: {
          _id: admin._id,
          Email: admin.Email,
        },
      });
    } else {
      const restoraunt = await Restoraunts.findOne({ Email });
      const customer = await Customer.findOne({ Email });
      if (!restoraunt && !customer)
        throw Error('Korisnik sa tim e-mailom nepostoji');

      //Validate password
      if (restoraunt) {
        const isMatch = await bcrypt.compare(Password, restoraunt.Password);
        if (!isMatch) throw Error('Lozinka je nevažeća');

        const token = jwt.sign({ _id: restoraunt._id }, process.env.JWT_SECRET);

        res.json({
          token,
          restoraunt: {
            _id: restoraunt._id,
            Name: restoraunt.Name,
            Email: restoraunt.Email,
            Description: restoraunt.Description,
            Location: restoraunt.Location,
            Type: restoraunt.Type,
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
      } else {
        const isMatch = await bcrypt.compare(Password, customer.Password);
        if (!isMatch) throw Error('Lozinka je nevažeća');

        const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET);

        res.json({
          token,
          customer: {
            _id: customer._id,
            Name: customer.Name,
            Email: customer.Email,
            Phone: customer.Phone,
            Favorite: customer.Favorite,
          },
        });
      }
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/**
 * @route   GET api/auth
 * @desc    GET user data
 * @access  private
 */
exports.userData = async (req, res, next) => {
  try {
    const restorauntt = await Restoraunts.findById(req.user._id).select(
      '-Password'
    );
    const customerr = await Customer.findById(req.user._id).select('-Password');
    if (!restoraunt && !customer) throw Error('Restoraunt Does not exist');
    if (restorauntt) res.json({ restoraunt: restorauntt });
    if (customerr) res.json({ customer: customerr });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
