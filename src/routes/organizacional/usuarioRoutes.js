const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/organizacional/usuarioController');
const {
    autenticacao,
    verificarPermissao,
    validarIds,
    validarQueryParamsUsuario
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

// === ROTA PÚBLICA ===
// Cadastro de usuário novo
router.post('/', usuarioController.criar);

// === ROTAS PRIVADAS ===
router.use(autenticacao);

// === Rotas de leitura (GET) - liberadas para todos os usuários autenticados
router.get('/', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), usuarioController.listar);
router.get('/filtros', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarQueryParamsUsuario, usuarioController.buscarPorFiltros);
router.get('/:id', verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), validarIds, usuarioController.buscarPorId);

// === Rotas de escrita (POST, PUT, DELETE) - restritas a admin e dev
router.post('/filial/:id/usuarios', verificarPermissao(ROLES.ADMIN, ROLES.DEV), validarIds, usuarioController.vincularMultiplosUsuarios);
router.post('/lote', verificarPermissao(ROLES.ADMIN, ROLES.DEV), usuarioController.criarEmMassa);
router.put('/:id/filial/:filialId', verificarPermissao(ROLES.ADMIN, ROLES.DEV), validarIds, usuarioController.vincularFilial);
router.put('/:id', verificarPermissao(ROLES.ADMIN, ROLES.DEV), validarIds, usuarioController.atualizar);
router.delete('/:id', verificarPermissao(ROLES.ADMIN, ROLES.DEV), validarIds, usuarioController.remover);

module.exports = router;