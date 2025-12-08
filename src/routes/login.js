import CustomRouter from './customRouter.js';
import { tokensController } from '../controllers/tokensController.js';
import config from '../utils/config.js';

class LoginRoutes extends CustomRouter {
  init() {
    this.post('/', [], [], async (req, res) => {
      const { password } = req.body;
      if (password === config.movalPass) {
        const token = await tokensController.createToken();

        return res
          .status(200)
          .json({ message: 'Login successful', token: token.token });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
    this.get('/', [], [], async (req, res) => {
      return res.render('login');
    });
    this.get('/status', [], [], async (req, res) => {
      return res.status(200).json({ status: 'Server is running' });
    });
  }
}

export default LoginRoutes;
