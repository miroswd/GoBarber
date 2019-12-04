// Configuração da parte de upload de arquivos

import multer from 'multer';
import crypto from 'crypto'; // Biblioteca do node - gera caracteres aleatórios
import { extname, resolve } from 'path';
// extname -> extensão do arquivo
// resolve -> percorre um caminho dentro da aplicação

export default {
  // objeto de configuração
  storage: multer.diskStorage({
    // Como o multer vai guardar o arquivo
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'), // Destino dos arquivos
    filename: (req, file, cb) => {
      // Formatando o nome do arquivo - transformando o nome, do arquivo, único
      crypto.randomBytes(16, (err, res) => {
        // Utiliza Callback ao invés de async await-> passar função como último parâmetro
        if (err) {
          return cb(err);
        }
        return cb(null, res.toString('hex') + extname(file.originalname)); // cb recebe o erro como primeiro parâmetro
      });
    },
    // cb == callback
  }),
};
