import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Package, Tags, ShoppingCart, Users, BarChart2, Settings, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";

const VendasPage = () => {
  const [venda, setVenda] = useState({
    referencia: "",
    produto: "",
    tamanho: "",
    quantidade: 1,
    valorUnitario: 0
  });

  const [itensVenda, setItensVenda] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [valorTotalGeral, setValorTotalGeral] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tamanhosDisponiveis, setTamanhosDisponiveis] = useState([]);

useEffect(() => {
  // Dados fake de produtos
  const produtosFake = [
    { referencia: "REF001", nome: "Camiseta Branca", preco: 49.9 },
    { referencia: "REF002", nome: "Calça Jeans", preco: 89.9 },
    { referencia: "REF003", nome: "Tênis Esportivo", preco: 129.9 },
    { referencia: "REF004", nome: "Jaqueta Jeans", preco: 149.9 },
    { referencia: "REF005", nome: "Boné Preto", preco: 29.9 }
  ];

  setProdutos(produtosFake);

  // Tamanhos fake (não atrelados à referência)
  const tamanhosFake = ["PP", "P", "M", "G", "GG"];
  setTamanhosDisponiveis(tamanhosFake);
}, []);


  useEffect(() => {
    const total = itensVenda.reduce((acc, item) => acc + (item.valorUnitario * item.quantidade), 0);
    setValorTotalGeral(total);
  }, [itensVenda]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "referencia") {
      const produtoSelecionado = produtos.find(p => p.referencia === value);
      if (produtoSelecionado) {
        setVenda((prev) => ({
          ...prev,
          referencia: value,
          produto: produtoSelecionado.nome,
          valorUnitario: produtoSelecionado.preco
        }));
      }
    } else {
      setVenda((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const adicionarItem = (e) => {
    e.preventDefault();
    const novoItem = {
      ...venda,
      quantidade: Number(venda.quantidade),
      valorUnitario: Number(venda.valorUnitario)
    };
    setItensVenda((prev) => [...prev, novoItem]);

    setVenda({
      referencia: "",
      produto: "",
      tamanho: "",
      quantidade: 1,
      valorUnitario: 0
    });
  };

  const excluirItem = (index) => {
    const itemExcluido = itensVenda[index];
    setItensVenda(itensVenda.filter((_, idx) => idx !== index));
    setValorTotalGeral(prev => prev - (itemExcluido.valorUnitario * itemExcluido.quantidade));
  };

  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", link: "/dashboard" },
    { icon: <ShoppingCart size={18} />, label: "Vendas", link: "/vendas" },
    { icon: <Package size={18} />, label: "Produtos", link: "/produtos" },
    { icon: <Tags size={18} />, label: "Tamanhos", link: "/tamanhos" },
    { icon: <Users size={18} />, label: "Usuários", link: "/usuarios" },
    { icon: <BarChart2 size={18} />, label: "Relatórios", link: "/relatorios" },
    { icon: <Settings size={18} />, label: "Configurações", link: "/configuracoes" }
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

        .sidebar-toggle {
          display: block;
          margin: 0 auto 20px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
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
        .form-box {
          max-width: 1000px;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          color: #141414;
          display: block;
          margin-bottom: 5px;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: white;
          color:#1E1E2F
        }
        .submit-btn {
          background-color: #1E1E2F;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background-color: #2f2f53;
        }
      `}</style>

      <Sidebar />

      <div className="content">
        <div className="form-box">
          <h2 style={{ color:'#141414' }}>Nova Venda</h2>
          <form onSubmit={adicionarItem}>
            <div className="form-grid">
              <div className="form-group">
                <label>Referência</label>
                <select name="referencia" value={venda.referencia} onChange={handleChange}>
                  <option value="">Selecione</option>
                  {produtos.map((produto) => (
                    <option key={produto.referencia} value={produto.referencia}>{produto.referencia}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Produto</label>
                <input type="text" name="produto" value={venda.produto} readOnly />
              </div>
              <div className="form-group">
                <label>Tamanho</label>
                <select
                  name="tamanho"
                  value={venda.tamanho}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o tamanho</option>
                  {tamanhosDisponiveis.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade</label>
                <input type="number" name="quantidade" value={venda.quantidade} onChange={handleChange} min="1" />
              </div>
              <div className="form-group">
                <label>Valor Unitário</label>
                <input type="number" name="valorUnitario" value={venda.valorUnitario} readOnly />
              </div>
            </div>
            <button className="submit-btn" type="submit">Adicionar Item</button>
          </form>

          <h3 style={{ marginTop: "30px", color:'#141414' }}>Itens da Venda</h3>
          <ul>
            {itensVenda.map((item, idx) => (
              <li style={{ color:"#141414" }} key={idx}>
                {item.produto} ({item.tamanho}) - {item.quantidade} x R$ {item.valorUnitario.toFixed(2)} = R$ {(item.quantidade * item.valorUnitario).toFixed(2)}
                <button onClick={() => excluirItem(idx)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ color:'#141414' }}>Total Geral: R$ {valorTotalGeral.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default VendasPage;
