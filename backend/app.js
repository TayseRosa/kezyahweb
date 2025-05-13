// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const app = express();

// Carregar variáveis de ambiente
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas principais
app.get('/', (req, res) => {
  res.send('Sistema de Vendas e Estoque');
});

// Roteamento de Produtos e Vendas
app.use('/api/produtos', productRoutes);
app.use('/api/vendas', saleRoutes);

module.exports = app;
