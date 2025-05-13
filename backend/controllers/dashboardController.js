// controllers/dashboardController.js
const Dashboard = require('../models/Dashboard');

exports.getDashboardData = async (req, res) => {
  try {
    // Buscar os dados do Dashboard
    const data = await Dashboard.find();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard', error);
    res.status(500).json({ message: 'Erro ao buscar dados' });
  }
};
