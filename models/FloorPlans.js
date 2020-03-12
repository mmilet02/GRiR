const mongoose = require('mongoose');

const FloorPlansSchema = new mongoose.Schema({
  restaurantID: {
    type: Number,
    required: true
  },
  numbOfTables: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('FloorPlans', FloorPlansSchema);
