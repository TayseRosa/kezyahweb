import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function CadastroProdutoPage() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);

  // Função para adicionar produto
  const handleAdicionar = async () => {
    if (!nome || !preco || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/produtos", {
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
      });
      setProdutos([...produtos, response.data]);
      setNome("");
      setPreco("");
      setQuantidade("");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar o produto");
    }
  };

  // Função para listar os produtos
  const listarProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
    }
  };

  // Carregar produtos quando a página for carregada
  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleAdicionar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar Produto
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Produtos cadastrados:</h2>
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado ainda.</p>
          ) : (
            <table className="w-full table-auto bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Nome</th>
                  <th className="p-2">Preço</th>
                  <th className="p-2">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto._id} className="border-t">
                    <td className="p-2">{produto.nome}</td>
                    <td className="p-2">R$ {produto.preco.toFixed(2)}</td>
                    <td className="p-2">{produto.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default CadastroProdutoPage;
