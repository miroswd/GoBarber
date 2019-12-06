import express from 'express';
import path from 'path';
import routes from './routes'; // importo o valor exportado de /routes e nomeio ele

import './database'; // Como nenhum valor será retornado, basta importar

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Middleware Global

    // Aceita apenas o método get
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    ); // A rota q vai servir o arquivo estático
  }

  routes() {
    /*
    this.server.get('/testando',(req,res) => {
      return res.json('Bom dia')
    }) */

    this.server.use(routes); // Globalizado o conteúdo de routes
  }
}

export default new App().server; // Preciso exportar uma variável, que será pega em um dos arquivos

// Para exportar uma class com o método constructor, preciso invocar com o new
