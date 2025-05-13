const express = require('express');
const {
  createSize,
  getAllSizes,
  getSizeById,
  deleteSize,
  updateSize
} = require('../controllers/sizeController');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Criar um novo tamanho
router.post('/sizes', authMiddleware, createSize);

// Listar todos os tamanhos
router.get('/', authMiddleware, getAllSizes);

// Buscar por ID
router.get('/:id', authMiddleware, getSizeById);

// Atualizar
router.put('/:id', authMiddleware, updateSize);

// Deletar um tamanho
router.delete('/:id', authMiddleware, deleteSize);

module.exports = router;
