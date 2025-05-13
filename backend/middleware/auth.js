const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  
  // Se não houver token no cabeçalho
  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    // Tenta verificar e decodificar o token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    
    // Adiciona os dados decodificados ao objeto da requisição (para uso em outras rotas)
    req.usuario = decoded;
    next();  // Se o token for válido, continua com a requisição
  } catch (err) {
    // Se o token estiver expirado ou inválido
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado. Por favor, faça login novamente." });
    }
    
    // Se o token for inválido por outro motivo
    return res.status(401).json({ message: "Token inválido." });
  }
};
