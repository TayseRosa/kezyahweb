const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema({
  nome: String,
  tipo: { type: String, enum: ['vendas', 'estoque'] },
  data: { type: Date },
  totalVendas: { type: Number, required: function() { return this.tipo === 'vendas'; }},
  totalEstoque: { type: Number, required: function() { return this.tipo === 'estoque'; }},
});

const Relatorio = mongoose.model('Relatorio', relatorioSchema);

module.exports = Relatorio;
