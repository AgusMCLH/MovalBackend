import Token from '../models/tokenModel.js';
import crypto from 'crypto';

class TokensDAO {
  constructor() {
    this.model = Token;
  }
  async createToken() {
    const tokenValue = crypto.randomBytes(32).toString('hex');
    const newToken = this.model.create({ token: tokenValue });
    return newToken;
  }
  async validateToken(tokenValue) {
    const token = await Token.findOne({ token: tokenValue });
    return token !== null;
  }
  async deleteToken(tokenValue) {
    await Token.deleteOne({ token: tokenValue });
  }
}

export const tokensDAO = new TokensDAO();
