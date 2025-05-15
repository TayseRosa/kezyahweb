import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar"
import {
  Home,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Settings
} from "lucide-react";

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { BarChart2 } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a29bfe", "#e17055"];

function DashboardPage({ user }) {
  
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const isAdmin = usuario?.tipo === "admin";

  const token = localStorage.getItem("token");

  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    barData: [],
    lineData: [],
    pieData: []
  });

    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchVendas = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch("https://kezyahweb.onrender.com/api/sales", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,  // Adicionando o token no cabeçalho
            },
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
  

    const navItems = [
      { icon: <Home size={18} />, label: "Dashboard", to: "/dashboard" },
      { icon: <ShoppingCart size={18} />, label: "Vendas", to: "/vendas" },
      { icon: <Package size={18} />, label: "Produtos", to: "/produtos" },
      { icon: <Tags size={18} />, label: "Tamanhos", to: "/tamanhos" },
      { icon: <Users size={18} />, label: "Usuários", to: "/usuarios" },
      { icon: <BarChart2 size={18} />, label: "Relatórios", to: "/relatorios" },
      { icon: <Settings size={18} />, label: "Configurações", to: "/configuracoes" }
    ];

    useEffect(() => {
      const token = localStorage.getItem("token");


      fetch("https://kezyahweb.onrender.com/api/dashboard")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            const barData = data.map(item => ({
              name: item.month,
              vendas: item.vendas
            }));
    
            const lineData = data.map(item => ({
              name: item.month,
              produtos: item.produtos
            }));
    
            const pieData = data.length > 0 ? data[data.length - 1].categorias : [];
    
            setDashboardData({
              barData,
              lineData,
              pieData
            });
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do dashboard:", err);
        });
    }, []);
    

  const handleLogout = () => {
      // Remover o token e dados do usuário do localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");

  // Redirecionar para a página de login
  navigate("/login");
};
  const barData = [
    { name: "Jan", vendas: 4000 },
    { name: "Fev", vendas: 3000 },
    { name: "Mar", vendas: 5000 },
    { name: "Abr", vendas: 4000 },
    { name: "Mai", vendas: 6000 }
  ];

  const lineData = [
    { name: "Jan", produtos: 240 },
    { name: "Fev", produtos: 139 },
    { name: "Mar", produtos: 380 },
    { name: "Abr", produtos: 290 },
    { name: "Mai", produtos: 480 }
  ];

  const pieData = [
    { name: "Categoria A", value: 400 },
    { name: "Categoria B", value: 300 },
    { name: "Categoria C", value: 300 },
    { name: "Categoria D", value: 200 }
  ];

  const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  useEffect(()=>{
    console.log("***TIPO***", isAdmin)

  },[isAdmin])

  return (
    <div className="layout">
      <style>{`
        .layout {
          display: flex;
          height: 100vh;
          width: 100vw;
        }
        .sidebar {
          width: ${sidebarOpen ? "220px" : "60px"};
          background-color: #1e1e2f;
          color: white;
          padding: 20px 10px;
          flex-shrink: 0;
          transition: width 0.3s ease;
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
        .sidebar-toggle {
          display: block;
          margin: 0 auto 20px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        .sidebar h2 {
          font-size: 16px;
          margin-bottom: 10px;
          text-transform: uppercase;
          color: #aaa;
          display: ${sidebarOpen ? "block" : "none"};
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
        .sidebar a:hover, .sidebar a.active {
          background-color: #2e2e42;
        }
        .sidebar a span {
          display: ${sidebarOpen ? "inline" : "none"};  
          
        }
        .content {
          flex: 1;
          padding: 40px;
          background-color: #f9f9f9;
          overflow-y: auto;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }
        .card h2 {
          font-size: 22px;
          color: #141414;
          margin-bottom: 15px;
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .top-bar .title {
          font-size: 26px;
          font-weight: bold;
          color: #141414;
        }
        .top-bar .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .logout-btn {
          background-color: #ef4444;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        .logout-btn:hover {
          background-color: #dc2626;
        }
      `}</style>

      <Sidebar />

      <div className="content">
        <div className="top-bar">
          <div className="title">Dashboard</div>
          <div className="user-info">
            <span style={{ color:'#141414' }}>Olá, {user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </div>

<div style={{ display:'flex', justifyContent:'space-between', background:'transparent' }}>
          <div className="card" style={{ margin:20 }}>
      
              {/* Gráficos */}
              <div className="form-flex" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>

                {/* Gráfico de Barras */}
                <div className="bg-white rounded-2xl shadow p-6" style={{ flex: 1, minWidth: '300px', color:'#000' }}>
                  {!isAdmin ? 'Sem permissão para visualizar' : 
                  <>
                  <h2 className="text-xl font-semibold mb-4">Total Vendido por Vendedora</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataBarChart}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  </>
                  }
                </div>

                {/* Gráfico de Pizza */}
                <div className="bg-white rounded-2xl shadow p-6" style={{ flex: 1, minWidth: '300px', color:'#000' }}>
                {!isAdmin ? 'Sem permissão para visualizar' : 
                  <>
                    <h2 className="text-xl font-semibold mb-4">Vendas Semana vs Mês</h2>
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
                  </>
                }
                </div>
              
              </div>
          </div>


        
</div>
      </div>
    </div>
  );
}

export default DashboardPage;