const mongoose = require('mongoose');

const FloorPlansSchema = new mongoose.Schema({
  RestaurantID: {
    type: String,
    required: true,
  },
  NumbOfTables: {
    type: Number,
    required: true,
  },
  Width: {
    type: Number,
    required: true,
  },
  Height: {
    type: Number,
    required: true,
  },
  FloorPlanImgName: {
    type: String,
    required: true,
  },
  TableList: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
});

module.exports = mongoose.model('FloorPlans', FloorPlansSchema);
