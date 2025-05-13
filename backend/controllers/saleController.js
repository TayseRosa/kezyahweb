const Sale = require('../models/Sale');
const Product = require('../models/Product');
// const Size = require('../models/Size'); // <-- Apenas descomente quando tiver o model de Tamanho

// Registrar venda
// Registrar venda

const createSale = async (req, res) => {
  try {
    const { seller, products } = req.body;

    if (!seller || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes ou inválidos.' });
    }

    let totalAmount = 0;
    const updatedProducts = [];

    for (const item of products) {
      const { ref, quantity, price: clientPrice } = item;

      if (!ref || quantity == null) {
        return res.status(400).json({ message: 'Referência e quantidade são obrigatórios para cada produto.' });
      }

      const trimmedRef = ref.trim(); // Remove espaços extras na referência

      console.log('Buscando produto com ref:', trimmedRef);

      const product = await Product.findOne({ ref: trimmedRef });

      if (!product) {
        return res.status(404).json({ message: `Produto com referência ${trimmedRef} não encontrado.` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock}, Solicitado: ${quantity}`
        });
      }

      const finalPrice = typeof clientPrice === 'number' && clientPrice > 0 ? clientPrice : product.price;
      const subtotal = quantity * finalPrice;
      totalAmount += subtotal;

      // Atualiza o estoque do produto
      product.stock -= quantity;
      await product.save();

      updatedProducts.push({
        productId: product._id,
        name: product.name,
        description: product.description,
        ref: product.ref,
        size: item.size || null, // Pode ser adaptado se quiser buscar tamanho do banco
        quantity,
        price: finalPrice
      });
    }

    const newSale = new Sale({
      seller,
      products: updatedProducts,
      totalAmount
    });

    await newSale.save();

    res.status(201).json({ message: 'Venda registrada com sucesso!', sale: newSale });

  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ message: 'Erro interno ao registrar a venda.' });
  }
};

// Listar todas as vendas
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('products.productId');
    res.status(200).json(sales);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({
      message: 'Erro ao buscar vendas',
      error
    });
  }
};

// Ver detalhes de uma venda
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('products.productId');
    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar detalhes da venda' });
  }
};

// Deletar uma venda
const deleteSale = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSale = await Sale.findByIdAndDelete(id);
  
      if (!deletedSale) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }
  
      res.status(200).json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar venda', error });
    }
  };

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSale
}
