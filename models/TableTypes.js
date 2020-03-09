const mongoose = require('mongoose');

const TableTypesSchema = new mongoose.Schema({
  imageName: {
    type: String,
    trim: true,
    required: true
  },
  tableType: {
    type: String,
    trim: true,
    required: true
  },
  sizeX: {
    type: Number,
    required: true
  },
  coordX: {
    type: Number,
    required: true
  },
  coordY: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('TableTypes', TableTypesSchema);
