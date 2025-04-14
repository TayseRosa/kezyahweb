import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardPage({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div>
            <span className="mr-4">Olá, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Bem-vindo ao sistema!</h2>
          <p>Em breve aqui você verá seus produtos, vendas e relatórios.</p>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
