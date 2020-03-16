const mongoose = require('mongoose');

const RestorauntSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  WorkingHours: {
    type: String,
    required: true
  },
  RestorauntPage: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  MaxNumbOfSeats: {
    type: Number,
    required: true
  },
  MaxNumbOfTables: {
    type: Number,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('restoraunts', RestorauntSchema);
