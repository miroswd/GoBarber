// Agenda do prestador
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize'; // Operadores do sequelize

import Appointment from '../models/Appointments';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // Comparação entre datas - agendamentos entre a primeira hora e última hora
          [Op.between]: [
            // Vai retornar o valor como chave desse objeto
            startOfDay(parsedDate), // 00:00:00
            endOfDay(parsedDate), // 23:59:59
          ],
        },
      },
      order: ['date'],
    });

    return res.json({ appointments });
  }
}

export default new ScheduleController();
