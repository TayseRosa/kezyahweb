const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    console.log(senhaValida); // Verifique o valor retornado

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

module.exports = router;
