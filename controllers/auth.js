const Restoraunts = require('../models/Restoraunts.js');
const Customer = require('../models/Customer.js');
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
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }
  try {
    // Check for existing restoraunt

    const restoraunt = await Restoraunts.findOne({ Email });
    const customer = await Customer.findOne({ Email });
    if (!restoraunt && !customer) throw Error('User does not exists');

    //Validate password
    if (restoraunt) {
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
          Viewes: restoraunt.Viewes,
          ImgName: restoraunt.ImgName
        }
      });
    } else {
      const isMatch = await bcrypt.compare(Password, customer.Password);
      if (!isMatch) throw Error('Invalid credentials');

      const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET);

      res.json({
        token,
        customer: {
          _id: customer._id,
          Name: customer.Name,
          Email: customer.Email,
          Phone: customer.Phone
        }
      });
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
