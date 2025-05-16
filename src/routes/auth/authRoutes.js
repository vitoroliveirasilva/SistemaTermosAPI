const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');
const {
    autenticacao,
    verificarPermissao
} = require('../../middlewares');
const ROLES = require('../../constants/roles');

// === Rotas públicas ===
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// === Rota privada (logout exige token válido) ===
router.post('/logout', autenticacao, verificarPermissao(ROLES.USUARIO, ROLES.ADMIN, ROLES.DEV), authController.logout);

module.exports = router;
