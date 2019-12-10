// Carregando as variáveis ambiente
import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';

import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';

import routes from './routes'; // importo o valor exportado de /routes e nomeio ele

import './database'; // Como nenhum valor será retornado, basta importar

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
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
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // Impede o carregamento infinito no insomnia
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        // Quando um middleware recebe 4 parâmetros, é um middleware de tratamento de exceções
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server; // Preciso exportar uma variável, que será pega em um dos arquivos

// Para exportar uma class com o método constructor, preciso invocar com o new
