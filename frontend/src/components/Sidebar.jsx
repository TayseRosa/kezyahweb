import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  List,
  Tags,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
  };

  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", to: "/dashboard" },
    { icon: <ShoppingCart size={18} />, label: "Vendas", to: "/vendas" },
    { icon: <Package size={18} />, label: "Cadastrar Produtos*", to: "/produtos" },
    { icon: <List size={18} />, label: "Lista de Produtos*", to: "/lista-produtos" },
    { icon: <Tags size={18} />, label: "Tamanhos*", to: "/tamanhos" },
    { icon: <BarChart2 size={18} />, label: "Relatórios**", to: "/relatorios" },
    { icon: <Settings size={18} />, label: "Configurações", to: "/configuracoes" },
    { icon: <Users size={18} />, label: "Usuários", to: "/usuarios" },
    
    { icon: <LogOut size={18} color={'#f00'} />, label: "Sair", to: "/login" }
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: ${sidebarOpen ? "220px" : "60px"};
          background-color: #240561;
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
        .sidebar a:hover,
        .sidebar a.active {
          background-color: #3E0C9F;
        }
        .sidebar a span {
          display: ${sidebarOpen ? "inline" : "none"};
        }
      `}</style>

      <div className="sidebar">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <div className="logo">
          <img src="https://kezyahmodas.com.br/public/img/logo.jpg" alt="Logo" />
        </div>
        <h2>Menu</h2>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-link ${
              location.pathname === item.to ? "active" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
