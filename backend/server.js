require('dotenv').config(); 
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const sizeRoutes = require('./routes/sizeRoutes')
const relatorioRoutes = require('./routes/relatorioRoutes'); 
const configRoutes = require('./routes/configRoutes')
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());

// Configura o body parser para permitir leitura de JSON
app.use(bodyParser.json());

// Configurar CORS
app.use(cors());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
  })
  .catch((err) => {
    console.log('Erro ao conectar com o MongoDB:', err);
  });

// Usando as rotas
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', saleRoutes);
app.use('/', sizeRoutes);
app.use('/api', relatorioRoutes);
app.use('/api', configRoutes); 
app.use('/api/dashboard', dashboardRoutes);


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});