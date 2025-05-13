// routes/configRoutes.js
const express = require('express');
const { 
    createConfiguracao, 
    getConfiguracoes, 
    updateConfiguracoes, 
    cadastrarUsuario, 
    listarUsuarios, 
    editarUsuario, 
    excluirUsuario } = require('../controllers/configController');
const router = express.Router();

/******** CONFIGURAÇÕES **********/
// Rota para obter as configurações
router.get('/configuracoes', getConfiguracoes); // GET /api/configuracoes
router.post('/configuracoes', createConfiguracao); // POST /api/configuracoes
router.put('/configuracoes', updateConfiguracoes); // PUT /api/configuracoes

/******** USUARIOS **********/

// Rota para cadastro de usuarios
router.get('/usuarios', listarUsuarios);
router.post('/usuarios', cadastrarUsuario);
router.put('/usuarios/:id', editarUsuario); // PUT /api/usuarios/:id
router.delete('/usuarios/:id', excluirUsuario); // DELETE /api/usuarios/:id

module.exports = router;