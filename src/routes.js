import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Importando Models
import User from './app/models/User';

// Importando Controllers
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import ProviderController from './app/controllers/ProviderController';
import UserController from './app/controllers/UserController';
import ScheduleController from './app/controllers/ScheduleController';
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

// Criando usuário
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store); // Login - autenticação

// Autenticação
routes.use(authMiddleware); // Aplica em todas as rotas abaixo

// Criação
routes.post('/appointments', AppointmentController.store);
routes.post('/files', upload.single('file'), FileController.store);

// Exibição
routes.get('/appointments', AppointmentController.index);
routes.get('/notifications', NotificationController.index);
routes.get('/providers', ProviderController.index);
routes.get('/schedule', ScheduleController.index);

// Atualização
routes.put('/users', UserController.update);

export default routes; // Será importado em app.js como global
