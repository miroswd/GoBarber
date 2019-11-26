import express from 'express';
import routes from './routes' // importo o valor exportado de /routes e nomeio ele

class App{
  constructor(){
    this.server = express();


    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json()); // Middleware Global
  }

  routes(){
    /*          
    this.server.get('/testando',(req,res) => {
      return res.json('Bom dia')
    })*/

    this.server.use(routes) // Globalizado o conteúdo de routes
  }

}

export default new App().server // Preciso exportar uma variável, que será pega em um dos arquivos

// Para exportar uma class com o método constructor, preciso invocar com o new