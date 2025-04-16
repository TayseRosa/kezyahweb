import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const ConfiguracoesPage = () => {
  const [tamanho, setTamanho] = useState({ nome: "" });
  const [tamanhos, setTamanhos] = useState([]); // Estado para armazenar os tamanhos cadastrados
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setTamanho({ nome: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tamanho.nome) {
      setErrorMessage("O nome do tamanho é obrigatório.");
      setSuccessMessage("");
      return;
    }

    // Simulando o cadastro adicionando o tamanho ao estado
    setTamanhos((prevTamanhos) => [...prevTamanhos, tamanho]);
    setSuccessMessage("Tamanho cadastrado com sucesso!");
    setErrorMessage("");
    setTamanho({ nome: "" }); // Limpar o campo após o envio
  };

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
          width: 220px;
          background-color: #1e1e2f;
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
        .form-box h1 {
          color: #141414;
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
          color:#1e1e2f;
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
        .form-group {
          margin-bottom: 15px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
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
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content">
        <div className="form-box">
          <h1>Título</h1>


        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
