const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['admin', 'vendas'],  // Pode adicionar mais tipos conforme necessário
    default: 'vendas',
  },
}, {
  timestamps: true, // cria campos createdAt e updatedAt
});

// Criptografa a senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next(); // Só criptografa se a senha for modificada

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Adicionando o método para comparar a senha em login
UsuarioSchema.methods.compararSenha = async function (senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
