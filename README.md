
# 💻 Sistema Web de Vendas e Controle de Estoque

Este é um sistema completo de controle de vendas e estoque com autenticação JWT, feito com ReactJS no frontend e Node.js + Express + MongoDB no backend. Também será futuramente conectado a um aplicativo mobile feito com React Native(em desenvolvimento).

---

## 🔧 Tecnologias Utilizadas

### Frontend
- ReactJS
- Axios
- React Router DOM
- Context API (para autenticação)
- Styled Components ou Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (Autenticação)
- dotenv
- bcryptjs
- cors
- morgan

---

## 🧩 Funcionalidades

### ✅ Autenticação
- Login com JWT
- Controle de sessão

### ✅ Estoque
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Listagem e busca

### ✅ Vendas
- Registro de nova venda
- Subtração automática do estoque
- Listagem de vendas

---

## 🗂️ Estrutura do Projeto

```
/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
└── README.md
```

---

## 🚀 Como Rodar o Projeto

### 🧠 Pré-requisitos
- Node.js instalado
- MongoDB rodando em nuvem (MongoDB Atlas)
- NPM
---

### 📦 Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sistema-vendas
JWT_SECRET=sua_chave_jwt
```

4. Inicie o servidor:

```bash
npm run dev
# ou
yarn dev
```

---

### 🌐 Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env`:

```
VITE_API_URL=http://localhost:5000
```

4. Rode o frontend:

```bash
npm run dev
# ou
yarn dev
```

---

## 📱 Futuro: Integração com React Native

Após a finalização do sistema web, será desenvolvido um app em React Native que se conectará à mesma API, para registrar vendas e controlar o estoque pelo celular.

---

## 📌 Observações
- O sistema é modular e pode ser facilmente escalado.
- Toda a comunicação com o backend é protegida com JWT.
- Recomendado usar MongoDB Atlas em produção.

---

## ✨ Contribuição
Se quiser contribuir, fique à vontade! Faça um fork, crie uma branch, e envie seu pull request.

---

## 👨‍💻 Autor
Desenvolvido por [Tayse Rosa](https://github.com/tayserosa)
