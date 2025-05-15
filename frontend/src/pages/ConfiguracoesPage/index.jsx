import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaSave, FaCog, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import './styles.css';

const ConfiguracoesPage = () => {
  const [configuracoes, setConfiguracoes] = useState({
    lojaNome: "",
    lojaEndereco: "",
    telefone: "",
    email: "",
    moeda: "R$",
    tempoLimiteEstoque: 30,
    metodoPagamento: "PIX",
  });

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "vendas",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null); // Estado para o usuário sendo editado
  const [abaAtiva, setAbaAtiva] = useState("config");

  useEffect(() => {
    async function fetchConfiguracoes() {
      try {
        const response = await fetch('https://kezyahweb.onrender.com/api/configuracoes');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setConfiguracoes(data);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
    fetchConfiguracoes();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const configResponse = await fetch('https://kezyahweb.onrender.com/api/configuracoes');
        if (configResponse.ok) {
          const configData = await configResponse.json();
          if (configData) {
            setConfiguracoes(configData);
          }
        }
  
        await fetchUsuarios(); // Carrega os usuários junto
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    }
  
    fetchData();
  }, []);
  

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://kezyahweb.onrender.com/api/usuarios');
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = configuracoes._id ? 'PUT' : 'POST';
      const response = await fetch('https://kezyahweb.onrender.com/api/configuracoes', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configuracoes),
      });

      if (response.ok) {
        alert('Configurações salvas com sucesso!');
      } else {
        console.error('Erro ao salvar configurações:', response.statusText);
        alert('Erro ao salvar configurações.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor.', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = usuarioEditado
        ? `https://kezyahweb.onrender.com/api/usuarios/${usuarioEditado._id}`
        : 'https://kezyahweb.onrender.com/api/usuarios';
      const method = usuarioEditado ? 'PUT' : 'POST';
  
      // Monta o corpo da requisição
      const payload = {
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo,
      };
  
      // Apenas adiciona a senha se for novo usuário ou o campo foi preenchido
      if (!usuarioEditado || novoUsuario.senha.trim() !== '') {
        payload.senha = novoUsuario.senha;
      }
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Usuário salvo com sucesso!');
        setNovoUsuario({ nome: "", email: "", senha: "", tipo: "vendas" });
        setUsuarioEditado(null);
        fetchUsuarios();
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar usuário:', errorData);
        alert('Erro ao salvar usuário: ' + errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguracoes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditarUsuario = (id) => {
    const usuario = usuarios.find((usuario) => usuario._id === id);
    setUsuarioEditado(usuario);
    setNovoUsuario({
      nome: usuario.nome,
      email: usuario.email,
      senha: '', // Senha não vem preenchida no modo de edição
      tipo: usuario.tipo,
    });
  };

  const handleExcluirUsuario = async (id) => {
    try {
      const response = await fetch(`https://kezyahweb.onrender.com/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuário excluído com sucesso!');
        fetchUsuarios(); // Atualiza a lista após exclusão
      } else {
        alert('Erro ao excluir usuário.');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="configuracoes-page">
      <Sidebar />
      <div className="configuracoes-content">
        

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {abaAtiva === "config" && (
            <form onSubmit={handleSubmit} className="configuracoes-form" style={{ flex: 1, minWidth: 300 }}>
              <h1><FaCog /> Configurações</h1>
              <label>Nome da Loja:</label>
              <input
                type="text"
                name="lojaNome"
                value={configuracoes.lojaNome}
                onChange={handleChange}
                required
              />
              <label>Endereço da Loja:</label>
              <input
                type="text"
                name="lojaEndereco"
                value={configuracoes.lojaEndereco}
                onChange={handleChange}
                required
              />
              <label>Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={configuracoes.telefone}
                onChange={handleChange}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={configuracoes.email}
                onChange={handleChange}
                required
              />
              <label>Moeda:</label>
              <input
                type="text"
                name="moeda"
                value={configuracoes.moeda}
                onChange={handleChange}
                required
              />
              <label>Tempo Limite Estoque (dias):</label>
              <input
                type="number"
                name="tempoLimiteEstoque"
                value={configuracoes.tempoLimiteEstoque}
                onChange={handleChange}
                required
              />
              <label>Metódo de Pagamento:</label>
              <select
                name="metodoPagamento"
                value={configuracoes.metodoPagamento}
                onChange={handleChange}
              >
                <option value="PIX">PIX</option>
                <option value="Boleto">Boleto</option>
                <option value="Cartão">Cartão</option>
              </select>
              <button type="submit" className="btnBlue">
                <FaSave /> Salvar Configurações
              </button>
            </form>
          )}

          {abaAtiva === "usuarios" && (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', minWidth: 300, flexDirection: 'row' }}>
              <div>
                <form onSubmit={handleUsuarioSubmit} className="configuracoes-form">
                  <h1><FaUserPlus /> {usuarioEditado ? "Editar Usuário" : "Cadastro de Usuários"}</h1>
                  <label>Nome do Usuário:</label>
                  <input
                    type="text"
                    name="nome"
                    value={novoUsuario.nome}
                    onChange={handleUsuarioChange}
                    required
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={novoUsuario.email}
                    onChange={handleUsuarioChange}
                    required
                  />
                  <label>Senha:</label>
                  <input
                    type="password"
                    name="senha"
                    value={novoUsuario.senha}
                    onChange={handleUsuarioChange}
                    required={!usuarioEditado}
                  />
                  <label>Tipo de Acesso:</label>
                  <select
                    name="tipo"
                    value={novoUsuario.tipo}
                    onChange={handleUsuarioChange}
                  >
                    <option value="vendas">Vendas</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <button type="submit" className="btnBlue">
                    <FaSave /> {usuarioEditado ? "Salvar Edição" : "Cadastrar Usuário"}
                  </button>
                </form>
              </div>
              <div>
                <h1><FaUserPlus /> Usuários cadastrados</h1>
                <ul style={{ padding: 0, listStyleType: 'none' }}>
                  {usuarios.map((usuario) => (
                    <li
                      key={usuario._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid #ddd',
                        marginBottom: '10px',
                        color:'#141414',
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 'bold' }}>{usuario.nome}</p>
                        <p>{usuario.email}</p>
                        <p style={{ fontSize: '12px', color: '#777' }}>Tipo: {usuario.tipo}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleEditarUsuario(usuario._id)} style={{ background:'green' }} ><FaEdit /></button>
                        <button onClick={() => handleExcluirUsuario(usuario._id)} style={{ background:'red' }} ><FaTrash /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
