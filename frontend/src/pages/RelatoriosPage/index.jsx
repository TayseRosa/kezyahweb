import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importando os ícones

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { BarChart2 } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a29bfe", "#e17055"];

const RelatoriosPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const isAdmin = usuario?.tipo === "admin";

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchVendas = async () => {
      try {
        const response = await fetch("https://kezyahweb.onrender.com/api/sales",{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
          }
        });
        const data = await response.json();
        setVendas(data);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  
  const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const getStartOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const startOfWeek = getStartOfWeek();
  const startOfMonth = getStartOfMonth();

  const vendasSemana = vendas.filter((venda) => new Date(venda.createdAt) >= startOfWeek);
  const vendasMes = vendas.filter((venda) => new Date(venda.createdAt) >= startOfMonth);

  const totalSemana = vendasSemana.reduce((acc, venda) => acc + venda.totalAmount, 0);
  const totalMes = vendasMes.reduce((acc, venda) => acc + venda.totalAmount, 0);
  const totalGeral = vendas.reduce((acc, venda) => acc + venda.totalAmount, 0);

  const vendasPorVendedora = vendas.reduce((acc, venda) => {
    acc[venda.seller] = (acc[venda.seller] || 0) + venda.totalAmount;
    return acc;
  }, {});

  const dataBarChart = Object.keys(vendasPorVendedora).map((seller) => ({
    name: seller,
    total: vendasPorVendedora[seller],
  }));

  const dataPieChart = [
    { name: "Semana", value: totalSemana },
    { name: "Mês", value: totalMes },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Carregando dados...</p>
      </div>
    );
  }
  
  return (
    <div className="layout">
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          color:#252525
        }
        .layout {
          display: flex;
          height: 100vh;
          width: 100vw;
        }
        .sidebar {
          width: 220px;
          background-color: #240561;
          color: white;
          padding: 20px 10px;
          flex-shrink: 0;
        }
        .sidebar .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .sidebar .logo img {
          width: 100%;
          max-width: 100px;
          height: auto;
          margin-bottom: 20px;
        }
        .sidebar h2 {
          font-size: 16px;
          margin-bottom: 10px;
          text-transform: uppercase;
          color: #aaa;
        }
        .sidebar a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease-in-out;
        }
        .sidebar a:hover {
          background-color: #2e2e42;
        }
        .content {
          flex: 1;
          padding: 40px;
          background-color: #f9f9f9;
          overflow-y: auto;
        }
        .form-box {
          max-width: 1000px;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .form-box h1, 
        .form-box h2 {
          color: #240561;
          font-size:24px;
          font-weight:bold
        }
        .form-group label {
          color: #141414;
        }
        .form-group input {
          width: 100%;
          padding: 8px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          color:#240561;
        }
        .btn-submit {
          background-color: #240561;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
        }
        .btn-submit:hover {
          background-color: #292940;
        }
        .message {
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .message.error {
          background-color: #ffdddd;
          color: #b20000;
          border: 1px solid #ffaaaa;
        }
        .message.success {
          background-color: #ddffdd;
          color: #007f00;
          border: 1px solid #aaffaa;
        }
        .form-group {
          margin-bottom: 15px;
        }
        
        /* Substituindo o grid por flexbox */
        .form-flex {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .form-group {
          flex: 1 1 45%; /* Faz com que os itens ocupem 45% do espaço e se ajustem conforme necessário */
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        /* Estilos para a tabela */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          text-align: left;
          padding: 12px;
        }
        th {
          background-color: #240561;
          color: #fff;
          border-bottom: 0;
        }
        td {
          background-color: #f4f4f4;
          color: #240561;
        }
        td button {
          background: none;
          border: none;
          cursor: pointer;
          color: #3E0C9F;
        }
        .icons {
          display: flex;
          gap: 10px;
        }
        tr:nth-child(odd) {
          background-color: #f9f9f9;
          border-bottom: 1px solid #dedede;
        }

        /* Ajustes para layout responsivo */
        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            display: flex;
            overflow-x: auto;
            padding: 10px;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
            min-width:770px;
          }
          .content {
            padding: 20px;
          }
          .form-box {
            padding: 20px;
          }
          .form-flex {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content">
        <div className="form-box">
          <div className="flex-1 p-6 space-y-8">
            <h2 style={{ color:'#240561' }}>
              <BarChart2 /> Relatórios de Vendas
            </h2>

            {/* Cartões de Resumo */}
            <div className="form-flex">
              <div className="bg-white rounded-2xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Total Geral</h2>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                  <p className="text-2xl text-green-600">{formatCurrency(totalGeral)}</p>
                }
              </div>
              <div className="bg-white rounded-2xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Total da Semana</h2>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                  <p className="text-2xl text-blue-600">{formatCurrency(totalSemana)}</p>
                }
              </div>
              <div className="bg-white rounded-2xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Total do Mês</h2>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                  <p className="text-2xl text-purple-600">{formatCurrency(totalMes)}</p>
                }
              </div>
            </div>

            {/* Gráficos */}
            <div className="form-flex">
              {/* Gráfico de Barras */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Total Vendido por Vendedora</h2>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataBarChart}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                }
              </div>

              {/* Gráfico de Pizza */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Vendas Semana vs Mês</h2>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={dataPieChart} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      fill="#8884d8"
                      label
                    >
                      {dataPieChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;
