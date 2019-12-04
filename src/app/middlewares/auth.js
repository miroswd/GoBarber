// Precisa verificar se o usuário está logado - através do token
import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // Biblioteca padrão - node

import authConfig from '../../config/auth'; // secret para validar o token

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Separando Bearer de Token
  const [, token] = authHeader.split(' '); // Separa em um array a partir de espaço

  // Comparando os tokens

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // retorna uma função com os parâmetros
    // console.log(decoded); // retorna os dados do token

    req.userId = decoded.id; // Usuário responsável pelo token
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
