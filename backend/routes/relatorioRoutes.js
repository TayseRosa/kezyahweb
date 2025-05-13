const express = require('express');
const { getRelatoriosByDateRange } = require('../controllers/relatorioController');
const authMiddleware = require('../middleware/auth');
const authorizationMiddleware = require('../middleware/authorization');

const router = express.Router();

// Rota para buscar relatórios por intervalo de datas
router.post('/relatorios',authMiddleware,authorizationMiddleware, getRelatoriosByDateRange);

module.exports = router;
