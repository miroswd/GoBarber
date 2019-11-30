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

    const { name, email, provider } = await User.create(req.body);
    return res.json({ name, email, provider });
  }

  // Rota de atualização, é necessário estar autenticado
  async update(req, res) {
    const { email, oldPassword } = req.body;

    // Buscando o usuário no banco de dados
    const user = await User.findByPk(req.userId); // primaryKey

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // Só verifica se o usuário informar a oldPassword
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
