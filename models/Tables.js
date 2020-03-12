const mongoose = require('mongoose');

const TablesSchema = new mongoose.Schema({
  floorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FloorPlans'
  },
  coordX: {
    type: Number,
    required: true
  },
  coordY: {
    type: Number,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  sizeX: {
    type: Number,
    required: true
  },
  tableType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tables', TablesSchema);
