// Criando autenticação
import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: req.body.email } });

    // Verificando se o usuário existe
    if (!user) {
      // Não autorizado
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.error(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, '8538607221f2e42284acf599214cfa34', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
