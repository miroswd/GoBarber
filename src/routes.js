import { Router } from 'express';

// Pegando apenas o router de express
const routes = new Router();

routes.get('/teste', (req, res) => res.json({ msg: 'Hello World!' }));

export default routes; // Será importado em app.js como global
