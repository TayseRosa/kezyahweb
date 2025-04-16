import React, { useState } from "react";
import { Home, Package, Tags, ShoppingCart, Users, BarChart2, Settings } from "lucide-react";
import Sidebar from "../components/Sidebar";

const ListaProdutosPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const produtosFake = [
    {
      id: 1,
      nome: "Camiseta Branca",
      referencia: "CAM001",
      preco: "79.90",
      quantidade: 15,
      tamanho: "M"
    },
    {
      id: 2,
      nome: "Calça Jeans",
      referencia: "CAL002",
      preco: "129.90",
      quantidade: 10,
      tamanho: "G"
    },
    {
      id: 3,
      nome: "Tênis Esportivo",
      referencia: "TEN003",
      preco: "199.90",
      quantidade: 8,
      tamanho: "42"
    }
  ];

  return (
    <div className="layout">
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
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
        .content {
          flex: 1;
          padding: 40px;
          background-color: #f9f9f9;
          overflow-y: auto;
        }
        .list-box {
          max-width: 1000px;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .list-box h1 {
          color: #141414;
          margin-bottom: 20px;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
        }
        .product-table th, .product-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .product-table th {
          background-color: #1e1e2f;
          color: white;
        }
        .product-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .product-table tr:hover {
          background-color: #e0e0e0;
        }
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
          }
          .content {
            padding: 20px;
          }
        }
      `}</style>

      <Sidebar />

      <div className="content">
        <div className="list-box">
          <h1>Lista de Produtos Cadastrados</h1>
          <table className="product-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Referência</th>
                <th>Preço (R$)</th>
                <th>Quantidade</th>
                <th>Tamanho</th>
              </tr>
            </thead>
            <tbody>
              {produtosFake.map((produto) => (
                <tr key={produto.id} style={{color:'#1E1E2F'}}>
                  <td>{produto.nome}</td>
                  <td>{produto.referencia}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.tamanho}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaProdutosPage;
