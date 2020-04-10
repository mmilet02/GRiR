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
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('customer', CustomerSchema);
