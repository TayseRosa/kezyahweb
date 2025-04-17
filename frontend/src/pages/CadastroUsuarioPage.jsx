import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2 } from "lucide-react";

const CadastroUsuarioPage = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.tipo) {
      setErrorMessage("Todos os campos são obrigatórios.");
      setSuccessMessage("");
      return;
    }

    setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
    setSuccessMessage("Usuário cadastrado com sucesso!");
    setErrorMessage("");
    setUsuario({ nome: "", email: "", senha: "", tipo: "" });
  };

  const handleDelete = (index) => {
    const confirmDelete = confirm("Deseja realmente excluir este usuário?");
    if (confirmDelete) {
      setUsuarios((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="layout">
      <style>{`
        .layout {
          display: flex;
          height: 100vh;
          width: 100vw;
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
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #141414;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 8px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          color: #1e1e2f;
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
        .user-list {
          list-style: none;
          padding: 0;
        }
        .user-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
        }
        .user-actions {
          display: flex;
          gap: 10px;
        }
        .user-actions button {
          background: none;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }
          .content {
            padding: 20px;
          }
        }
      `}</style>

      <Sidebar />

      <div className="content">
        <div className="form-box">
          <h1>Cadastrar Usuário</h1>

          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={usuario.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de Acesso</label>
              <select name="tipo" value={usuario.tipo} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option value="vendedora">Vendedora</option>
                <option value="administradora">Administradora</option>
              </select>
            </div>

            <button type="submit" className="btn-submit">Cadastrar Usuário</button>
          </form>

          <div style={{ marginTop: "30px" }}>
            <h2 style={{ color: "#1e1e2f" }}>Usuários Cadastrados</h2>
            {usuarios.length > 0 ? (
              <ul className="user-list">
                {usuarios.map((u, index) => (
                  <li className="user-item" key={index}>
                    <span style={{ color:'#141414' }}>{u.nome} ({u.tipo})</span>
                    <div className="user-actions">
                      <button onClick={() => alert("Função de edição ainda não implementada.")} title="Editar">
                        <Pencil size={18} color="#1e1e2f" />
                      </button>
                      <button onClick={() => handleDelete(index)} title="Excluir">
                        <Trash2 size={18} color="#b20000" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum usuário cadastrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuarioPage;
