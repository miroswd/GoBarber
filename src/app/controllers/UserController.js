// Feature de criação
import * as Yup from 'yup'; // importando tudo como yup
import User from '../models/User';

// Biblioteca de validação de dados

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // req.body == objeto
    // formato do dado = shape

    // Verificando se o req.body está passando conforme o schema
    if (!(await schema.isValid(req.body))) {
      // retorna false
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ), // Se a oldPassword for informada, a password deverá ser preenchida
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ), // Usando a password para comparar se as senhas batem
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
