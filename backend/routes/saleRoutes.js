const express = require('express');
const { createSale, getSales, getSaleById, deleteSale } = require('../controllers/saleController');
const Sale = require('../models/Sale');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Rota para registrar uma venda
router.post('/sales',authMiddleware, createSale);

// Rota para listar todas as vendas
router.get('/sales',authMiddleware, getSales);
  
// Rota para obter uma venda especifica
router.get('/sales/:id',authMiddleware, getSaleById);
  
// Rota para deletar uma venda
router.delete('/sales/:id',authMiddleware, deleteSale);
  
module.exports = router;
