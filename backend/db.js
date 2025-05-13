const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Sai com erro
  }
};

module.exports = connectDB;
