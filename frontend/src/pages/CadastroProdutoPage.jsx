import React, { useState } from "react";
import axios from "axios";
import {
  Home,
  Package,
  Tags,
  ShoppingCart,
  Users,
  BarChart2,
  Settings
} from "lucide-react";

const CadastroProdutoPage = () => {
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
    imagem: null,
    referencia: "",
    descricao: "",
    tamanho: "",
    valorDinheiro: "",
    valorPix: "",
    valorCartaoCredito: "",
    valorCartaoDebito: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduto((prev) => ({
      ...prev,
      imagem: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(produto).forEach((key) => {
      formData.append(key, produto[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccessMessage("Produto cadastrado com sucesso!");
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setErrorMessage("Erro ao cadastrar produto.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="layout">
      <style>{`
        .layout {
          display: flex;
          height: 100vh;
          font-family: sans-serif;
        }

        .sidebar {
          width: 220px;
          background-color: #1e1e2f;
          color: white;
          padding: 20px;
        }

        .sidebar .logo {
          margin-bottom: 30px;
          text-align: center;
        }

        .sidebar .logo img {
          width: 100px;
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
          padding: 10px 5px;
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
          overflow: auto;
          min-width:950px;
          height:100vh;
        }

        h1{
        color:#1E1E2F;
        }

        .form-box {
          max-width: 1000px;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }

        .form-box h1 {
          margin-bottom: 20px;
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
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color:#1E1E2F;
        }

        .form-group input {
          width: 100%;
          padding: 8px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color:transparent !important;
        }

        .btn-submit {
          background-color: #1e1e2f;
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
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/caminho/para/logo.png" alt="Logo" />
        </div>
        <h2>Menu</h2>
        <a href="#"><Home size={18} /> Dashboard</a>
        <a href="#"><Package size={18} /> Produtos</a>
        <a href="#"><Tags size={18} /> Categorias</a>
        <a href="#"><ShoppingCart size={18} /> Vendas</a>
        <a href="#"><Users size={18} /> Clientes</a>
        <a href="#"><BarChart2 size={18} /> Relatórios</a>
        <a href="#"><Settings size={18} /> Configurações</a>
      </div>

      {/* Conteúdo */}
      <div className="content">
        <div className="form-box">
          <h1>Cadastrar novo produto</h1>

          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Coluna 1 */}
              <div>
                <div className="form-group">
                  <label htmlFor="imagem">Imagem do Produto</label>
                  <input type="file" id="imagem" name="imagem" onChange={handleFileChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="nome">Nome do Produto</label>
                  <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="referencia">Referência</label>
                  <input type="text" id="referencia" name="referencia" value={produto.referencia} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <input type="text" id="descricao" name="descricao" value={produto.descricao} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="tamanho">Tamanho</label>
                  <input type="text" id="tamanho" name="tamanho" value={produto.tamanho} onChange={handleChange} />
                </div>
              </div>

              {/* Coluna 2 */}
              <div>
                <div className="form-group">
                  <label htmlFor="quantidade">Quantidade</label>
                  <input type="number" id="quantidade" name="quantidade" value={produto.quantidade} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="preco">Preço</label>
                  <input type="number" id="preco" name="preco" value={produto.preco} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="valorDinheiro">Valor Dinheiro</label>
                  <input type="number" id="valorDinheiro" name="valorDinheiro" value={produto.valorDinheiro} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="valorPix">Valor Pix</label>
                  <input type="number" id="valorPix" name="valorPix" value={produto.valorPix} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="valorCartaoCredito">Cartão Crédito</label>
                  <input type="number" id="valorCartaoCredito" name="valorCartaoCredito" value={produto.valorCartaoCredito} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="valorCartaoDebito">Cartão Débito</label>
                  <input type="number" id="valorCartaoDebito" name="valorCartaoDebito" value={produto.valorCartaoDebito} onChange={handleChange} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit">Cadastrar Produto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroProdutoPage;
