// Listando notificações
import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      // Corresponde ao findAll do sequelize
      user: req.userId,
    })
      .sort({ createdAt: 'desc' }) // Decrescente
      .limit(20); // Ordenando

    return res.json(notifications);
  }

  async update(req, res) {
    // const notifications = await Notification.findById(req.params.id);
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // Atualizo o campo read
      { new: true } // Retorna o novo registro atualizado
    );
    return res.json(notification);
  }
}

export default new NotificationController();
