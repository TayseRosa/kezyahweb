import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import {
  Home,
  Package,
  Tags,
  ShoppingCart,
  Users,
  BarChart2,
  Settings
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function DashboardPage({ user }) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
      { icon: <Home size={18} />, label: "Dashboard", to: "/dashboard" },
      { icon: <ShoppingCart size={18} />, label: "Vendas", to: "/vendas" },
      { icon: <Package size={18} />, label: "Produtos", to: "/produtos" },
      { icon: <Tags size={18} />, label: "Tamanhos", to: "/tamanhos" },
      { icon: <Users size={18} />, label: "Usuários", to: "/usuarios" },
      { icon: <BarChart2 size={18} />, label: "Relatórios", to: "/relatorios" },
      { icon: <Settings size={18} />, label: "Configurações", to: "/configuracoes" }
    ];

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
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
            <span>Olá, {user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </div>

<div style={{ display:'flex', justifyContent:'space-between', background:'transparent' }}>
        <div className="card" style={{ margin:20 }}>
          <h2>Gráfico de Barras - Vendas por mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="vendas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{margin:20}}>
          <h2>Gráfico de Linha - Produtos por mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="produtos" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{margin:20}}>
          <h2>Gráfico de Pizza - Categorias</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
</div>
      </div>
    </div>
  );
}

export default DashboardPage;