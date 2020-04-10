const mongoose = require('mongoose');

const GradesSchema = new mongoose.Schema({
  RestaurantID: {
    type: String,
    required: true,
  },
  CustomerID: {
    type: String,
    required: true,
  },
  Grade: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Grades', GradesSchema);
