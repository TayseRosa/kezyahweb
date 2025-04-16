import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CadastroProdutoPage from "./pages/CadastroProdutoPage";
import VendasPage from "./pages/VendasPage";
import CadastroTamanhoPage from "./pages/CadastroTamanhoPage";
import CadastroUsuarioPage from "./pages/CadastroUsuarioPage";
import ListaProdutosPage from "./pages/ListaProdutosPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";

function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={setUser} />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />}
      />
      
      <Route
        path="/vendas"
        element={user ? <VendasPage /> : <Navigate to="/venda" />}
      />

      <Route
        path="/produtos"
        element={user ? <CadastroProdutoPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/lista-produtos"
        element={user ? <ListaProdutosPage /> : <Navigate to="/lista-produtos" />}
      />

      <Route
        path="/relatorios"
        element={user ? <RelatoriosPage /> : <Navigate to="/relatorios" />}
      />

      <Route
        path="/configuracoes"
        element={user ? <ConfiguracoesPage /> : <Navigate to="/configuracoes" />}
      />

      <Route path="*" element={<Navigate to="/login" />} />

      <Route
        path="/tamanhos"
        element={user ? <CadastroTamanhoPage /> : <Navigate to="/tamanhos" />}
      />
      <Route path="*" element={<Navigate to="/tamanhos" />} />

      <Route
        path="/usuarios"
        element={user ? <CadastroUsuarioPage /> : <Navigate to="/usuarios" />}
      />
      <Route path="*" element={<Navigate to="/usuarios" />} />
    </Routes>
  );
}

export default AppRoutes;
