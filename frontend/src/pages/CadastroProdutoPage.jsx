import React, { useState, useEffect } from "react";
import axios from "axios";

const CadastroProdutoPage = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [editando, setEditando] = useState(false);
  const [produtoId, setProdutoId] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await axios.put(`http://localhost:5000/api/produtos/${produtoId}`, {
          nome,
          preco: parseFloat(preco),
          quantidade: parseInt(quantidade),
        });
        setMensagem("Produto atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:5000/api/produtos", {
          nome,
          preco: parseFloat(preco),
          quantidade: parseInt(quantidade),
        });
        setMensagem("Produto cadastrado com sucesso!");
      }

      setNome("");
      setPreco("");
      setQuantidade("");
      setEditando(false);
      setProdutoId(null);
      buscarProdutos();
    } catch (error) {
      setMensagem("Erro ao cadastrar/editar o produto.");
      console.error(error);
    }
  };

  const excluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produtos/${id}`);
      setMensagem("Produto excluído com sucesso!");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const iniciarEdicao = (produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setQuantidade(produto.quantidade);
    setProdutoId(produto.id);
    setEditando(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">
        {editando ? "Editar Produto" : "Cadastro de Produto"}
      </h2>

      {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Preço:</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editando ? "Atualizar Produto" : "Cadastrar Produto"}
        </button>
      </form>

      <h3 className="text-xl font-bold mt-10 mb-4">Produtos Cadastrados</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Nome</th>
            <th className="border px-2 py-1 text-left">Preço</th>
            <th className="border px-2 py-1 text-left">Quantidade</th>
            <th className="border px-2 py-1 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td className="border px-2 py-1">{produto.nome}</td>
              <td className="border px-2 py-1">R$ {produto.preco}</td>
              <td className="border px-2 py-1">{produto.quantidade}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => iniciarEdicao(produto)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirProduto(produto.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroProdutoPage;
