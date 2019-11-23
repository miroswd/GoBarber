const { Router } = require('express') // Pegando apenas o router de express
const routes = new Router();

routes.get('/teste', (req,res) => {
  return res.json({msg:'Hello World!'})
})

module.exports = routes; // Será importado em app.js como global