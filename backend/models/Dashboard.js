  // models/Dashboard.js
  const mongoose = require('mongoose');

  const dashboardSchema = new mongoose.Schema({
    month: { type: String, required: true },
    vendas: { type: Number, required: true },
    produtos: { type: Number, required: true },
    categorias: [
      {
        name: String,
        value: Number,
      },
    ],
  });

  module.exports = mongoose.model('Dashboard', dashboardSchema);
