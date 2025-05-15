import React, { useState, useEffect } from "react";
import { Home, Package, Tags, Users, BarChart2, Settings, Trash2, ShoppingCart } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import './styles.css'

const VendasPage = () => {
  const [venda, setVenda] = useState({
    referencia: "",
    produto: "",
    description: "",
    tamanho: "",
    quantidade: 1,
    valorUnitario: 0
  });
  const [itensVenda, setItensVenda] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [valorTotalGeral, setValorTotalGeral] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [dinheiroRecebido, setDinheiroRecebido] = useState(0);
  const [troco, setTroco] = useState(0);

  useEffect(() => {
    async function fetchProdutos() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('https://kezyahweb.onrender.com/api/products', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // Adicionando o token no cabeçalho
          },
        });
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.log('Erro ao buscar produtos', error);
      }
    }

    async function fetchTamanhos() {
      const token = localStorage.getItem("token")

      try {
        const response = await fetch('https://kezyahweb.onrender.com/',{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

        const data = await response.json();
        setTamanhos(data);
      } catch (err) {
        console.log("Erro ao buscar tamanhos:", err);
      }
    }

    fetchProdutos();
    fetchTamanhos();
  }, []);

  useEffect(() => {
    const total = itensVenda.reduce((acc, item) => acc + (item.valorUnitario * item.quantidade), 0);
    setValorTotalGeral(total);
  }, [itensVenda]);

  useEffect(() => {
    if (formaPagamento === "dinheiro") {
      setTroco(dinheiroRecebido - valorTotalGeral);
    }
  }, [dinheiroRecebido, formaPagamento, valorTotalGeral]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "referencia") {
      const produtoSelecionado = produtos.find(p => p.ref === value.trim());
      if (produtoSelecionado) {
        setVenda(prev => ({
          ...prev,
          referencia: value,
          produto: produtoSelecionado.name,
          description: produtoSelecionado.description,
          valorUnitario: produtoSelecionado.price
        }));
      } else {
        setVenda(prev => ({
          ...prev,
          referencia: value,
          produto: "",
          description: "",
          valorUnitario: 0
        }));
      }
    } else {
      setVenda(prev => ({
        ...prev,
        [name]: name === "quantidade" ? Number(value) : value
      }));
    }
  };

  const adicionarItem = (e) => {
    e.preventDefault();

    // Validações
    if (!venda.referencia.trim()) {
      alert("Por favor, informe a referência do produto.");
      return;
    }
    if (venda.quantidade <= 0) {
      alert("A quantidade deve ser maior que zero.");
      return;
    }
    if (venda.valorUnitario <= 0) {
      alert("O valor unitário do produto deve ser maior que zero.");
      return;
    }
    if (!venda.produto) {
      alert("Produto não encontrado pela referência informada.");
      return;
    }

    const novoItem = {
      ...venda,
      quantidade: Number(venda.quantidade),
      valorUnitario: Number(venda.valorUnitario)
    };

    setItensVenda(prev => [...prev, novoItem]);

    setVenda({
      referencia: "",
      produto: "",
      description: "",
      tamanho: "",
      quantidade: 1,
      valorUnitario: 0
    });
  };

  const excluirItem = (index) => {
    const itemExcluido = itensVenda[index];
    setItensVenda(itensVenda.filter((_, idx) => idx !== index));
    setValorTotalGeral(prev => prev - (itemExcluido.valorUnitario * itemExcluido.quantidade));
  };

  const abrirModal = () => {
    if (itensVenda.length === 0) {
      alert("Adicione pelo menos um item antes de finalizar a venda.");
      return;
    }
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };
  
  const finalizarVenda = async () => {
    const token = localStorage.getItem("token");

    const vendaParaEnviar = {
      seller: "João da Silva",
      products: itensVenda.map(item => ({
        ref: item.referencia,
        quantity: item.quantidade,
        price: item.valorUnitario,
        size: item.tamanho
      }))
    };
    
    try {
      const token = localStorage.getItem("token")
      console.log("***Token enviado***:", token);

      const response = await fetch('https://kezyahweb.onrender.com/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(vendaParaEnviar)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Venda efetuada com sucesso!');
        console.log('Resposta da venda:', data);
        setItensVenda([]);
        setValorTotalGeral(0);
        fecharModal();
      } else {
        alert(`Erro ao registrar venda: ${data.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      alert('Erro interno ao registrar venda.');
    }
  };

  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", link: "/dashboard" },
    { icon: <ShoppingCart size={18} />, label: "Vendas", link: "/vendas" },
    { icon: <Package size={18} />, label: "Produtos", link: "/produtos" },
    { icon: <Tags size={18} />, label: "Tamanhos", link: "/tamanhos" },
    { icon: <Users size={18} />, label: "Usuários", link: "/usuarios" },
    { icon: <BarChart2 size={18} />, label: "Relatórios", link: "/relatorios" },
    { icon: <Settings size={18} />, label: "Configurações", link: "/configuracoes" }
  ];

  return (
    <div className="layout">
      <style>{`/* (TODO seu CSS continua igual aqui, sem nenhuma alteração) */`}</style>
      <Sidebar />
      <div className="content">
        <div className="form-box">
          <h2 style={{ color:'#240561' }}>
            <ShoppingCart /> Nova venda
          </h2>
          <form onSubmit={adicionarItem}>
            <div className="form-grid">
              <div className="form-group">
                <label>Referência</label>
                <select 
                  name="referencia" 
                  value={venda.referencia} 
                  onChange={handleChange}
                >
                  <option value="">Selecione uma ref</option>
                  {produtos.map((produto) => (
                    <option key={produto._id} value={produto.ref}>
                      {produto.name} ({produto.ref})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantidade</label>
                <input type="number" name="quantidade" value={venda.quantidade} onChange={handleChange} min="1" />
              </div>

              <div className="form-group">
                <label>Tamanho</label>
                <select
                  name="tamanho"
                  value={venda.tamanho}
                  onChange={handleChange}
                >
                  <option value="">Selecione o tamanho</option>
                  {tamanhos.map((tamanho) => (
                    <option key={tamanho._id} value={tamanho.name}>
                      {tamanho.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Produto</label>
                <input type="text" name="produto" value={venda.produto} readOnly style={{ backgroundColor: '#f2f2f2' }} />
              </div>

              <div className="form-group">
                <label>Valor Unitário</label>
                <input type="number" name="valorUnitario" value={venda.valorUnitario} onChange={handleChange} min="1" />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <input type="text" name="description" value={venda.description} readOnly style={{ backgroundColor: '#f2f2f2' }} />
              </div>
            </div>

            <button type="submit" className="btnBlue">
              Adicionar item ao carrinho
            </button>
          </form>

          <h3 style={{ marginTop: "30px", color:'#141414' }}>Itens da Venda</h3>
          <ul>
            {itensVenda.map((item, idx) => (
              <li style={{ color:"#141414" }} key={idx}>
                {item.produto} ({item.tamanho}) - {item.quantidade} x R$ {item.valorUnitario.toFixed(2)} = R$ {(item.quantidade * item.valorUnitario).toFixed(2)}
                <button onClick={() => excluirItem(idx)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ color:'#141414' }}>Total Geral: R$ {valorTotalGeral.toFixed(2)}</h3>

          <button className="btnGreen" onClick={abrirModal}>Concluir venda</button>

          {isModalOpen && (
  <div className="modal-overlay" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // cor escura e transparente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div className="modal" style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minWidth: '300px',
      zIndex: 1100,
      color: '#000'
    }}>
      <h3>Selecione a Forma de Pagamento</h3>
      <select 
        value={formaPagamento} 
        onChange={(e) => setFormaPagamento(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor:'#24056197'}}
      >
        <option value="">Selecione</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">Pix</option>
        <option value="cartao_credito">Cartão de Crédito</option>
        <option value="cartao_debito">Cartão de Débito</option>
      </select>

      {formaPagamento === "dinheiro" && (
        <div>
          <label>Dinheiro Recebido:</label>
          <input 
            type="number" 
            value={dinheiroRecebido} 
            onChange={(e) => setDinheiroRecebido(Number(e.target.value))}
            style={{ width: '94%', padding: '10px', marginBottom: '10px', border:0, backgroundColor:'#24056197' }}
          />
          <h4>Troco: R$ {troco.toFixed(2)}</h4>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button 
          onClick={finalizarVenda}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Finalizar Venda
        </button>
        <button 
          onClick={fecharModal}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default VendasPage;
