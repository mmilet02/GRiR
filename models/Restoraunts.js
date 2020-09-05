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
  TableList: [
    {
      TableID: {
        type: String,
        required: true,
      },
      TableType: {
        type: String,
        required: true,
      },
      NOP: {
        type: String,
        required: true,
      },
      TableSizeH: {
        type: String,
      },
      TableSizeW: {
        type: String,
      },
      TableSize: {
        type: String,
      },
    },
  ],
  FloorPlanImgName: {
    type: String,
    required: true,
  },
  ValidatedBy: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('restoraunts', RestorauntSchema);
