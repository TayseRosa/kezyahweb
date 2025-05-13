const express = require('express');
const router = express.Router();
const Usuario = require('../models/User'); // caminho conforme seu projeto
const authMiddleware = require('../middleware/auth');

// GET - listar usuários
router.get('/', authMiddleware, async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  });
  
  // POST - cadastrar
  router.post('/', authMiddleware, async (req, res) => {
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  });
  
  // PUT - editar
  router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const atualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.json(atualizado);
  });
  
  // DELETE - excluir
  router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.status(204).end();
  });
  