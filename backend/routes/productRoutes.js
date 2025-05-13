const express = require('express');
const { createProduct, getProducts, putProducts, deleteProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/auth')

const router = express.Router();

// Criar um novo produto
router.post('/products',authMiddleware, createProduct);

// Listar todos os produtos
router.get('/products',authMiddleware, getProducts);

// Atualizar um produto
router.put('/products/:id',authMiddleware, putProducts );
  
// Deletar um produto  
router.delete('/products/:id',authMiddleware, deleteProducts);

module.exports = router;
