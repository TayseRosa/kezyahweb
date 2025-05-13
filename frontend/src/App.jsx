import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRoutes from './routes'

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppRoutes user={user} setUser={setUser} />
    </Router>
  );
}

export default App;