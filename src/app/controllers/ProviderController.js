// Listando apenas um tipo
import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },

      // Retornando apenas algumas informações
      attributes: ['id', 'name', 'email', 'avatar_id'],

      // Passando informações do avatar
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}
export default new ProviderController();
