const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  manufacturedDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
