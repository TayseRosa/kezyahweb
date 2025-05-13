const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  sizeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Size',
    required: false
  },
  stock: {
    type: Number,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  fornec: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
