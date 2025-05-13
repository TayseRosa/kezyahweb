// controllers/sizeController.js
const Size = require('../models/Size');

// Criar novo tamanho
const createSize = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const sizeExists = await Size.findOne({ name: name.trim().toUpperCase() });

    if (sizeExists) {
      return res.status(400).json({ message: 'Tamanho já cadastrado.' });
    }

    const newSize = new Size({ name });
    await newSize.save();

    res.status(201).json({ message: 'Tamanho cadastrado com sucesso!', size: newSize });
  } catch (error) {
    console.error('Erro ao cadastrar tamanho:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar tamanho.' });
  }
};

{/*
const createSize = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const existingSize = await Size.findOne({ name: name.trim().toUpperCase() });

    if (existingSize) {
      return res.status(400).json({ message: 'Tamanho já cadastrado.' });
    }

    const size = new Size({ name: name.trim().toUpperCase() });
    await size.save();

    res.status(201).json({ message: 'Tamanho criado com sucesso!', size });
  } catch (error) {
    console.error('Erro ao criar tamanho:', error);
    res.status(500).json({ message: 'Erro interno ao criar o tamanho.' });
  }
};
*/}

// Listar todos os tamanhos
const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ name: 1 }); // ordenado por ordem alfabética
    res.status(200).json(sizes);
  } catch (error) {
    console.error('Erro ao buscar tamanhos:', error);
    res.status(500).json({ message: 'Erro ao buscar tamanhos.' });
  }
};

// Buscar tamanho por ID
const getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) return res.status(404).json({ message: 'Tamanho não encontrado' });
    res.json(size);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar tamanho
const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const updatedSize = await Size.findByIdAndUpdate(
      id,
      { name: name.trim().toUpperCase() },
      { new: true }
    );

    if (!updatedSize) {
      return res.status(404).json({ message: 'Tamanho não encontrado.' });
    }

    res.status(200).json({ message: 'Tamanho atualizado com sucesso!', size: updatedSize });
  } catch (error) {
    console.error('Erro ao atualizar tamanho:', error);
    res.status(500).json({ message: 'Erro ao atualizar tamanho.' });
  }
};

// Deletar tamanho
const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSize = await Size.findByIdAndDelete(id);

    if (!deletedSize) {
      return res.status(404).json({ message: 'Tamanho não encontrado.' });
    }

    res.status(200).json({ message: 'Tamanho deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar tamanho:', error);
    res.status(500).json({ message: 'Erro ao deletar tamanho.' });
  }
};

module.exports = {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize
};
