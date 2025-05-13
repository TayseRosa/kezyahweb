const Product = require('../models/Product');
const Size = require('../models/Size');

// Criar um novo produto
const createProduct = async (req, res) => {
  try {
    const { sku, name, ref, description, sizeId, stock, costPrice, price, fornec } = req.body;

    // Verificar se o tamanho fornecido é válido
    let size;
    if (sizeId) {
      size = await Size.findById(sizeId);
      if (!size) {
        return res.status(404).json({ message: 'Tamanho não encontrado.' });
      }
    }

    const newProduct = new Product({
      sku,
      name,
      ref,
      description,
      sizeId, // Referência ao tamanho
      stock,
      costPrice,
      price,
      fornec
    });

    const savedProduct = await newProduct.save();

    // Retorna o produto com timestamps (createdAt e updatedAt)
    res.status(201).json({ message: 'Produto criado com sucesso!', product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error: err });
  }
};

// Listar todos os produtos
const getProducts = async (req, res) => {
  try {
    // Popula o tamanho e ordena por data de criação (mais recentes primeiro)
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Ordena do mais novo para o mais antigo
      .populate('sizeId');

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar produtos', error: err });
  }
};

// Alterar um produto
const putProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { sizeId, ...updateData } = req.body;

    // Se o tamanho foi alterado, validamos se o tamanho é válido
    if (sizeId) {
      const size = await Size.findById(sizeId);
      if (!size) {
        return res.status(404).json({ message: 'Tamanho não encontrado.' });
      }
      updateData.sizeId = sizeId;
    }

    // O updatedAt será atualizado automaticamente
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

// Deletar um produto
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  putProducts,
  deleteProducts
};