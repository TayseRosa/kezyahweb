const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
  seller: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      ref: String, // Referência do produto
      name: String, // Nome do produto (auto preenchido)
      description: String, // Descrição do produto (auto preenchido)
      size: String, // Pode ser substituído depois por ObjectId com ref para Size
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

{/*
const SaleSchema = new mongoose.Schema({
  seller: {
    type: String, // ou ref para uma collection de usuários se for mais estruturado
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      ref: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      size: {
        type: String // Quando tiver o model de tamanho, pode virar ref
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],  
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
*/}

module.exports = mongoose.model('Sale', SaleSchema);
