import { Router } from 'express';

// Importando Models
import User from './app/models/User';

// Importando Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Pegando apenas o router de express
const routes = new Router();

routes.get('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Miro',
    email: 'miroswd@email.com',
    password_hash: 'senha1234',
  });
  return res.json(user);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes; // Será importado em app.js como global
