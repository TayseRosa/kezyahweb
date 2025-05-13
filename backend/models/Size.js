const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  }
});

module.exports = mongoose.model('Size', sizeSchema);
