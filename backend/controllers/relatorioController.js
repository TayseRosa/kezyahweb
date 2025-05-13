const moment = require('moment');
const Relatorio = require('../models/Relatorio');

const getRelatoriosByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    // Verifique se as datas estão sendo recebidas corretamente
    console.log("Datas recebidas:", startDate, endDate);

    // Converte as datas para o formato Date no MongoDB
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    console.log("Datas convertidas:", start, end);

    const relatorios = await Relatorio.find({
      data: { $gte: start, $lte: end }
    });

    if (!relatorios.length) {
      return res.status(404).json({ message: 'Nenhum relatório encontrado para o período especificado.' });
    }

    return res.json({ relatorios });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar relatórios.' });
  }
};

module.exports = { getRelatoriosByDateRange };
