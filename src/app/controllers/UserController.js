// Feature de criação
import User from '../models/User';

class UserController {
  async store(req, res) {
    // mesma face de um middleware

    // Validando o email
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    /*
      como já foi definido que o usuário preencherá
      nome, email e pass, não tem a necessidade de
      pegar tudo de novo através do req.body
    */

    const { name, email, password_hash, provider } = await User.create(
      req.body
    );
    return res.json({ name, email, password_hash, provider });
  }
}

export default new UserController();
