import { tokensController } from '../controllers/tokensController.js';

async function authToken(req, res, next) {
  const token = req.query.token;
  console.log(token);

  if (!token) return res.status(400).json({ error: 'Token requerido' });

  const registro = await tokensController.validateToken(token);
  if (!registro) return res.status(401).redirect('/login');

  next();
}

export default authToken;
