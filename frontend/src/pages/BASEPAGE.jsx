import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importando os ícones

const ConfiguracoesPage = () => {
  const [tamanho, setTamanho] = useState({ name: "" });
  const [tamanhos, setTamanhos] = useState([]); // Estado para armazenar os tamanhos cadastrados
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null); // Novo estado para controlar o ID de edição

  // Função para buscar os tamanhos cadastrados
  const fetchTamanhos = async () => {
    try {
      const response = await fetch("https://kezyahweb.onrender.com/"); // Substitua pela URL da sua API
      const data = await response.json();
      setTamanhos(data); // Atualiza o estado com os tamanhos retornados
    } catch (error) {
      setErrorMessage("Erro ao carregar os tamanhos cadastrados.");
    }
  };

  const handleChange = (e) => {
    setTamanho({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tamanho.name) {
      setErrorMessage("O nome do tamanho é obrigatório.");
      setSuccessMessage("");
      return;
    }

    const url = editingId
      ? `https://kezyahweb.onrender.com/${editingId}` // URL para edição
      : "https://kezyahweb.onrender.com/sizes"; // URL para cadastro

    const method = editingId ? "PUT" : "POST"; // Se houver edição, usa PUT, caso contrário POST

    try {
      // Enviar o novo tamanho ou atualizar para o backend
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tamanho),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(editingId ? "Relatório editado com sucesso!" : "Relatório cadastrado com sucesso!");
        setErrorMessage("");
        setTamanhos((prevTamanhos) => {
          if (editingId) {
            // Atualiza o tamanho na lista local quando editar
            return prevTamanhos.map((t) =>
              t._id === editingId ? data : t
            );
          } else {
            // Adiciona novo tamanho se for cadastro
            return [...prevTamanhos, data];
          }
        });
        setTamanho({ name: "" }); // Limpa o campo após o envio
        setEditingId(null); // Reseta a edição após sucesso
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao salvar o tamanho.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
      setSuccessMessage("");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://kezyahweb.onrender.com/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTamanhos((prevTamanhos) => prevTamanhos.filter((t) => t._id !== id)); // Remove o item da lista local
        setSuccessMessage("Tamanho excluído com sucesso!");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao excluir o tamanho.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
      setSuccessMessage("");
    }
  };

  const handleEdit = (id) => {
    const tamanhoToEdit = tamanhos.find((t) => t._id === id);
    setTamanho({ name: tamanhoToEdit.name });
    setEditingId(id); // Define o ID de edição
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);  // Submete o formulário quando a tecla Enter é pressionada
    }
  };

  useEffect(() => {
    fetchTamanhos();
  }, [tamanho]);

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
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content">
        <div className="form-box">
          <h1>{editingId ? "Editar" : "Cadastrar"}</h1>

          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome </label>
              <input
                type="text"
                id="name"
                name="name"
                value={tamanho.name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              {editingId ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>

          {/* Tabela de Tamanhos Cadastrados */}
          <div>
            <h2>Itens Cadastrados</h2>
            {tamanhos.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nome </th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tamanhos.map((t, index) => (
                    <tr key={index}>
                      <td>
                        {editingId === t._id ? (
                          <input
                            type="text"
                            value={tamanho.name}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}  // Adiciona o evento onKeyDown
                            required
                          />
                        ) : (
                          t.name
                        )}
                      </td>

                      <td className="icons">
                        <button onClick={() => handleEdit(t._id)}>
                          <FaEdit color="green" />
                        </button>
                        <button onClick={() => handleDelete(t._id)}>
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum item cadastrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
