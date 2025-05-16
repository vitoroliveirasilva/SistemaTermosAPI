const authService = require('../../services/auth/authService');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.autenticar(email, senha);
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const resultado = await authService.renovarToken(refreshToken);
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
