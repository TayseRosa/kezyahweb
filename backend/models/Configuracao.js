const mongoose = require('mongoose');

const configuracaoSchema = new mongoose.Schema({
  lojaNome: { type: String, required: true },
  lojaEndereco: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  moeda: { type: String, default: "R$" },
  tempoLimiteEstoque: { type: Number, default: 30 }, // Em dias
  metodoPagamento: { type: String, default: "PIX" },

  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['admin', 'vendas'], default: 'vendas' }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

const Configuracao = mongoose.model('Configuracao', configuracaoSchema);

module.exports = Configuracao;
