const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  OIB: {
    type: Number,
    required: true
  },
  Nickname: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('customer', CustomerSchema);
