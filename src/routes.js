import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Importando Models
import User from './app/models/User';

// Importando Controllers
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Importando middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Miro',
    email: 'miroswd@email.com',
    password_hash: 'senha1234',
  });
  return res.json(user);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store); // Login - autenticação

routes.use(authMiddleware); // Aplica em todas as rotaas abaixo

routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes; // Será importado em app.js como global
