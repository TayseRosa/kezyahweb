import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CadastroProdutoPage from "./pages/CadastroProdutoPage";

function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={setUser} />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/produtos"
        element={user ? <CadastroProdutoPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
