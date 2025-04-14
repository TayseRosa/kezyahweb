import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-full flex flex-col">
      <h2 className="text-2xl font-bold text-center p-4 border-b">Menu</h2>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          </li>
          <li>
            <Link to="/produtos" className="text-blue-600 hover:underline">Cadastro de Produtos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
