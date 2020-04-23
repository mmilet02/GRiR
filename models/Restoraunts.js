const mongoose = require('mongoose');

const RestorauntSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  StartingHour: {
    type: Number,
    required: true,
  },
  EndingHour: {
    type: Number,
    required: true,
  },
  RestorauntPage: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Viewes: {
    type: Number,
    required: true,
  },
  ImgName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('restoraunts', RestorauntSchema);
