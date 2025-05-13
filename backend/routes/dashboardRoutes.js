// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getDashboardData);

module.exports = router;
