const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  RestorauntID: {
    type: String,
    required: true,
  },
  FloorPlanID: {
    type: String,
    required: true,
  },
  CustomerID: {
    type: String,
    required: true,
  },
  TableID: {
    type: [String],
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Hour: {
    type: String,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  NumberOfPeople: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('reservation', ReservationSchema);
