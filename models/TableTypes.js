const mongoose = require('mongoose');

const TableTypesSchema = new mongoose.Schema({
  ImageName: {
    type: String,
    trim: true,
    required: true
  },
  TableType: {
    type: String,
    trim: true,
    required: true
  },
  NumberOfPeople: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('TableTypes', TableTypesSchema);
