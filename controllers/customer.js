const Customer = require('../models/Customer.js');
const Restoraunts = require('../models/Restoraunts.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route   POST api/customer
 * @desc    register new customer
 * @access  public
 */
exports.postCustomer = async (req, res, next) => {
  const { Name, Email, Phone, Password } = req.body;

  //Simple validation
  if (!Name || !Email || !Phone || !Password) {
    return res.status(400).json({ msg: 'Niste unijeli sva polja.' });
  }
  try {
    // Check for existing restoraunt

    const customer = await Customer.findOne({ Email });
    const restoraunt = await Restoraunts.findOne({ Email });
    if (customer || restoraunt) throw Error('Gost s tim emailom već postoji.');

    //Create salt & hash

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(Password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newCustomer = new Customer({
      Name,
      Email,
      Phone,
      Favorite: [],
      Password: hash,
    });

    const savedCustomer = await newCustomer.save();
    if (!savedCustomer) throw Error('Something went wrong saving the customer');

    const token = jwt.sign({ _id: savedCustomer._id }, process.env.JWT_SECRET);
    res.json({
      token,
      customer: {
        _id: savedCustomer._id,
        Name: savedCustomer.Name,
        Email: savedCustomer.Email,
        Favorite: savedCustomer.Favorite,
        Phone: savedCustomer.Phone,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

//@desc Update  customer
//@route POST /api/customer/fav
//access private
exports.updateFavorite = async (req, res, next) => {
  try {
    const { _id, Favorite, token } = req.body;
    const customer = await Customer.findOne({ _id });
    customer.Favorite = Favorite;
    customer.save();
    return res.status(200).json({
      token,
      customer: {
        _id: customer._id,
        Name: customer.Name,
        Email: customer.Email,
        Favorite: customer.Favorite,
        Phone: customer.Phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

//@desc Get all customers
//@route GET /api/customer
//access public
exports.getCustomers = async (req, res, next) => {
  try {
    const customer = await Customer.find();
    return res.status(200).json({
      success: true,
      data: customer,
      count: customer.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
