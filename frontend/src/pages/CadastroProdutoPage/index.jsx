import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import './styles.css'
import { Package } from "lucide-react";

const CadastroProdutoPage = () => {
  const [produto, setProduto] = useState({
    sku:"",
    name: "",
    ref: "",
    description: "",
    stock: "",
    costPrice:"",
    price: "",
    fornec:""
  });
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos cadastrados
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null); // Novo estado para controlar o ID de edição

  // Função para buscar os produtos cadastrados
  const fetchProdutos = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch("https://kezyahweb.onrender.com/api/products",{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        }
      }); // Substitua pela URL da sua API
      const data = await response.json();
      setProdutos(data); // Atualiza o estado com os produtos retornados
    } catch (error) {
      setErrorMessage("Erro ao carregar os produtos cadastrados.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token")

    e.preventDefault();
    if ( !produto.sku || !produto.name || !produto.ref || !produto.description || !produto.stock || !costPrice || !produto.price || !produto.fornec) {
      setErrorMessage("Todos os campos são obrigatórios.");
      setSuccessMessage("");
      return;
    }

    const url = editingId
      ? `https://kezyahweb.onrender.com/api/products/${editingId}` // URL para edição
      : "https://kezyahweb.onrender.com/api/products/"; // URL para cadastro

    const method = editingId ? "PUT" : "POST"; // Se houver edição, usa PUT, caso contrário POST

    try {
      const token = localStorage.getItem("token")
      // Enviar o novo produto ou atualizar para o backend
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(editingId ? "Produto editado com sucesso!" : "Produto cadastrado com sucesso!");
        setErrorMessage("");
        setProdutos((prevProdutos) => {
          if (editingId) {
            // Atualiza o produto na lista local quando editar
            return prevProdutos.map((p) =>
              p._id === editingId ? data.product : p
            );
          } else {
            // Adiciona novo produto se for cadastro
            return [...prevProdutos, data.product];
          }
        });
        setProduto({sku:"", name: "", ref: "", description: "", stock: "", costPrice:"", price: "", fornec:"" }); // Limpa os campos após o envio
        setEditingId(null); // Reseta a edição após sucesso
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao salvar o produto.");
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
      const response = await fetch(`https://kezyahweb.onrender.com/api/products/${id}`, {
        method: "DELETE",
        Authorization: `Bearer ${token}`
      });

      if (response.ok) {
        setProdutos((prevProdutos) => prevProdutos.filter((p) => p._id !== id)); // Remove o item da lista local
        setSuccessMessage("Produto excluído com sucesso!");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao excluir o produto.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
      setSuccessMessage("");
    }
  };

  const handlePriceChange = (e, index) => {
    let value = e.target.value;
  
    // Remove tudo que não for número
    value = value.replace(/[^\d]/g, "");
  
    // Divide por 100 para formatar como moeda
    const floatValue = (parseInt(value) / 100).toFixed(2);
  
    // Formata para BRL com vírgula
    const formattedValue = floatValue
      .replace(".", ",");
  
    const updatedProducts = [...venda.products];
    updatedProducts[index].price = formattedValue;
  
    setVenda({ ...venda, products: updatedProducts });
  };  

  const handleEdit = (id) => {
    const produtoToEdit = produtos.find((p) => p._id === id);
    setProduto({
      sku: produto.sku,
      name: produtoToEdit.name,
      ref: produtoToEdit.ref,
      description: produtoToEdit.description,
      stock: produtoToEdit.stock,
      costPrice: produto.costPrice,
      price: produtoToEdit.price,
      fornec: produtoToEdit.fornec
    });
    setEditingId(id); // Define o ID de edição
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="form-box">
          

          <h2 style={{ color:'#240561' }}>
            <Package /> {editingId ? "Editar produto" : "Cadastrar novo produto"}
          </h2> 


          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group half">
              <label htmlFor="sku">SKU do Produto(número único)</label>
              <input
                type="number"
                id="sku"
                name="sku"
                value={produto.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="name">Nome do Produto</label>
              <input
                type="text"
                id="name"
                name="name"
                value={produto.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="ref">Referência</label>
              <input
                type="text"
                id="ref"
                name="ref"
                value={produto.ref}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                id="description"
                name="description"
                value={produto.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="stock">Quantidade</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={produto.stock}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group half">
              <label htmlFor="costPrice">Preço de CUSTO</label>
              <input
                type="number"
                id="costPrice"
                name="costPrice"
                value={produto.costPrice}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group half">
              <label htmlFor="price">Preço de VENDA</label>
              <input
                type="number"
                id="price"
                name="price"
                value={produto.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group half">
              <label htmlFor="fornec">Fornecedor</label>
              <input
                type="text"
                id="fornec"
                name="fornec"
                value={produto.fornec}
                onChange={handleChange}
                
              />
            </div>


            <button type="submit" className="btnGreen">
              {editingId ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroProdutoPage;
