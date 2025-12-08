import { tokensDAO } from '../DAO/tokensDAO.js';

class TokensController {
  async createToken() {
    try {
      const newToken = await tokensDAO.createToken();
      return newToken;
    } catch (error) {
      return { error: error.message };
    }
  }
  async validateToken(tokenValue) {
    try {
      const isValid = await tokensDAO.validateToken(tokenValue);
      return isValid;
    } catch (error) {
      return { error: error.message };
    }
  }
  async deleteToken(tokenValue) {
    try {
      await tokensDAO.deleteToken(tokenValue);
      return { message: 'Token eliminado correctamente' };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export const tokensController = new TokensController();
