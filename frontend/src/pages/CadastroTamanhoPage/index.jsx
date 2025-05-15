import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importando os ícones
import { Tags } from "lucide-react";

const CadastroTamanhoPage = () => {
  const [tamanho, setTamanho] = useState({ name: "" });
  const [tamanhos, setTamanhos] = useState([]); // Estado para armazenar os tamanhos cadastrados
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null); // Novo estado para controlar o ID de edição

  // Função para buscar os tamanhos cadastrados
  const fetchTamanhos = async () => {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("https://kezyahweb.onrender.com/", {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }
      }); 
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
    const token = localStorage.getItem("token")
    
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
      const token = localStorage.getItem("token")
      // Enviar o novo tamanho ou atualizar para o backend
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tamanho),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(editingId ? "Tamanho editado com sucesso!" : "Tamanho cadastrado com sucesso!");
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
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`https://kezyahweb.onrender.com/${id}`, {
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
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
      <Sidebar />
      <div className="content">
        <div className="form-box">         

          <h2 style={{ color:'#240561' }}>
            <Tags /> {editingId ? "Editar Tamanho" : "Cadastrar Tamanho"}
          </h2>

          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome do Tamanho</label>
              <input
                type="text"
                id="name"
                name="name"
                value={tamanho.name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btnBlue">
              {editingId ? "Salvar Alterações" : "Cadastrar Tamanho"}
            </button>
          </form>

          {/* Tabela de Tamanhos Cadastrados */}
          <div>
            <h2>Tamanhos Cadastrados</h2>
            {tamanhos.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nome do Tamanho</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {[...tamanhos].reverse().map((t, index) => (
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
              <p>Nenhum tamanho cadastrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroTamanhoPage;
