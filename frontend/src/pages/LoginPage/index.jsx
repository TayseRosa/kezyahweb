import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.mensagem || "Erro ao fazer login");
        return;
      }

      const data = await response.json();

      // Salvar token e dados do usuário (pode ser no localStorage, se preferir)
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Notificar o app que o usuário está logado
      onLogin(data.usuario);

      // Redirecionar para o dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            Entrar
          </button>
        </div>
      </div>

      <div style={styles.rightSide}>
        <img src="https://kezyahmodas.com.br/public/img/logo.jpg" alt="Logo" style={styles.logo} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
  },
  leftSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minWidth:400
  },
  rightSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3E0C9F",
    padding: "20px",
    minWidth:800
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "360px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#141414',
  },
  input: {
    width: "93%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: '#141414',
    backgroundColor: '#fff'
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3e0c9f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logo: {
    maxWidth: "80%",
    height: "auto",
  },
};

export default LoginPage;
