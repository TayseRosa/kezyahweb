import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import './styles.css';
import { List } from "lucide-react";

const ListaProdutosPage = () => {
  const [produtoEditado, setProdutoEditado] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const isAdmin = usuario?.tipo === "admin";

  const fetchProducts = async () => {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("https://kezyahweb.onrender.com/api/products",{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    const produto = produtos.find((p) => p._id === id);
    setProdutoEditado({ ...produto });
    setEditingId(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEditado((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleKeyDown = async (e) => {
    const token = localStorage.getItem("token")
    if (e.key === "Enter") {
      try {
        const response = await fetch(`https://kezyahweb.onrender.com/api/products/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(produtoEditado),
        });

        if (response.ok) {
          const updated = await response.json();
          setProdutos((prev) =>
            prev.map((p) => (p._id === editingId ? updated : p))
          );
          setSuccessMessage("Produto atualizado com sucesso!");
          setEditingId(null);
        } else {
          const error = await response.json();
          setErrorMessage(error.message || "Erro ao editar.");
        }
      } catch (error) {
        setErrorMessage("Erro ao conectar com o servidor.");
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")

    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      const response = await fetch(`https://kezyahweb.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        }
      });

      if (response.ok) {
        setProdutos((prev) => prev.filter((p) => p._id !== id));
        setSuccessMessage("Produto excluído com sucesso!");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Erro ao excluir.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="form-box">
          <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            
            <h2 style={{ color:'#240561' }}>
              <List /> Lista de Produtos Cadastrados
            </h2>

            <Link to="/produtos" className="btn-newProd">
              + novo produto
            </Link>
          </div>
          
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          {produtos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Referência</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço custo</th>
                  <th>Preço venda</th>
                  <th>Fornecedor</th>
                  <th>Estoque</th>
                  <th>Data de cadastro</th>
                  <th>Data atualização</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {[...produtos].reverse().map((produto) => (
                  <tr key={produto._id} style={{ color: 'black' }}>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="text"
                          name="sku"
                          value={produtoEditado.sku || ""}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEditSku"
                        />
                      ) : (
                        produto.sku
                      )}
                    </td>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="text"
                          name="reference"
                          value={produtoEditado.ref || ""}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEditRef"
                        />
                      ) : (
                        produto.ref
                      )}
                    </td>
                   
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="text"
                          name="name"
                          value={produtoEditado.name}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                          autoFocus
                        />
                      ) : (
                        produto.name
                      )}
                    </td>
                   
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="text"
                          name="description"
                          value={produtoEditado.description || ""}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                        />
                      ) : (
                        produto.description
                      )}
                    </td>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="number"
                          step="0.01"
                          name="costPrice"
                          value={produtoEditado.costPrice}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                        />
                      ) : (
                        `R$${produto.costPrice?.toFixed(2).replace(".", ",")}`
                      )}
                    </td>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          value={produtoEditado.price}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                        />
                      ) : (
                        `R$${produto.price?.toFixed(2).replace(".", ",")}`
                      )}
                    </td>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="text"
                          name="fornec"
                          value={produtoEditado.fornec || ""}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                        />
                      ) : (
                        produto.fornec
                      )}
                    </td>
                    <td>
                      {editingId === produto._id ? (
                        <input
                          type="number"
                          name="stock"
                          value={produtoEditado.stock}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className="inputEdit"
                        />
                      ) : (
                        produto.stock
                      )}
                    </td>

                    <td>
                      {produto.createdAt
                      ? new Date(produto.createdAt).toLocaleString("pt-BR")
                      : "Data não disponível"}
                    </td>
                    <td>
                      {produto.updatedAt
                      ? new Date(produto.updatedAt).toLocaleString("pt-BR")
                      : "Data não disponível"}
                    </td>

                    <td className="icons">
                    {!isAdmin ? 'x ' : 
                      <button onClick={() => handleEdit(produto._id)}>
                        <FaEdit color="green" />
                      </button>
                    }

                    {!isAdmin ? 'x ' : 
                      <button onClick={() => handleDelete(produto._id)}>
                        <FaTrash color="red" />
                      </button>
                    }
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
  );
};

export default ListaProdutosPage;
