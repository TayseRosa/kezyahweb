const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Relatorio = require("./models/Relatorio"); // Certifique-se que o caminho está correto

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kezyah";

// Dados mock para inserir
const relatorios = [
  {
    nome: "Relatório de Vendas - Abril",
    data: new Date("2024-04-30"),
    totalVendas: 2000,
  },
  {
    nome: "Relatório de Estoque - Abril",
    data: new Date("2024-04-30"),
    totalEstoque: 150,
  },
  {
    nome: "Relatório de Atendimento - Abril",
    data: new Date("2024-04-25"),
    totalAtendimentos: 87,
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Conectado ao MongoDB");

    // Limpa a coleção antes de inserir novos dados
    await Relatorio.deleteMany();
    console.log("Relatórios antigos removidos.");

    // Insere os dados mock
    await Relatorio.insertMany(relatorios);
    console.log("Relatórios adicionados com sucesso!");

    process.exit();
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });
