// backend/middleware/authorization.js
module.exports = function(allowedTypes) {
    return function(req, res, next) {
      const { tipo } = req.usuario;  // Pega o tipo do usuário do token
  
      if (!allowedTypes.includes(tipo)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }
  
      next();  // Se o tipo for permitido, deixa acessar a rota
    };
  };
  