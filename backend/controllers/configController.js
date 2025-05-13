const bcrypt = require('bcrypt');
const Usuario = require('../models/User')
const Configuracao = require('../models/Configuracao');

// Cria uma nova configuração
const createConfiguracao = async (req, res) => {
    try {
        const novaConfiguracao = new Configuracao(req.body);
        await novaConfiguracao.save();
        res.status(201).json({ message: "Configuração criada com sucesso!", configuracao: novaConfiguracao });
      } catch (error) {
        console.error("Erro ao criar configuração:", error);
        res.status(500).json({ message: "Erro ao criar configuração." });
      }
  };

// Função para buscar as configurações do sistema
const getConfiguracoes = async (req, res) => {
  try {
    const configuracoes = await Configuracao.findOne();
    if (!configuracoes) {
      return res.status(404).json({ message: 'Configurações não encontradas.' });
    }
    res.status(200).json(configuracoes);
  } catch (error) {
    console.error('Erro ao carregar as configurações:', error);
    res.status(500).json({ message: 'Erro ao carregar as configurações.' });
  }
};

// Função para atualizar as configurações do sistema
const updateConfiguracoes = async (req, res) => {
    try {
        const config = await Configuracao.findOne();
        if (!config) {
          return res.status(404).json({ message: 'Configuração não encontrada.' });
        }
        const updatedConfig = await Configuracao.findByIdAndUpdate(config._id, req.body, { new: true });
        res.json(updatedConfig);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não foi possível atualizar as configurações.' });
      }
};

// Cadastro de novo usuário
const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verifica se o email já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Gera o hash da senha antes de salvar no banco
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria o novo usuário com a senha criptografada
    const novoUsuario = new Usuario({ nome, email, senha: hashedSenha, tipo });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar usuário.' });
  }
};

//Listar usuarios cadastrados
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro interno ao listar usuários.' });
  }
};

// Função para editar um usuário
const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !tipo) {
      return res.status(400).json({ message: "Nome, e-mail e tipo são obrigatórios." });
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    usuario.nome = nome;
    usuario.email = email;
    usuario.tipo = tipo;

    if (senha && senha.trim() !== '') {
      usuario.senha = senha; // Aqui, você pode adicionar a lógica de hash da senha se necessário
    }

    await usuario.save();
    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    res.status(500).json({ message: "Erro ao editar usuário." });
  }
};

// Função para excluir um usuário
// Função para excluir um usuário
const excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;  // Recebe o ID do usuário a ser excluído da URL

    // Tenta excluir o usuário com base no ID
    const usuario = await Usuario.findByIdAndDelete(id);

    // Se o usuário não for encontrado, retorna erro
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Retorna uma resposta de sucesso
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
};

module.exports = {
    createConfiguracao,
    getConfiguracoes,
    updateConfiguracoes,
    cadastrarUsuario,
    listarUsuarios,
    editarUsuario,
    excluirUsuario
};
