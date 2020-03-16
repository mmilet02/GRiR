const mongoose = require('mongoose');

const FloorPlansSchema = new mongoose.Schema({
  RestaurantID: {
    type: String,
    required: true
  },
  NumbOfTables: {
    type: Number,
    required: true
  },
  TableList: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  }
});

module.exports = mongoose.model('FloorPlans', FloorPlansSchema);
