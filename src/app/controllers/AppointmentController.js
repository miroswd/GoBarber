import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt'; // Pegando o idioma PT

// Importando models
import Appointment from '../models/Appointments';
import File from '../models/File';
import User from '../models/User';

// Importando Schema
import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

class AppointmentController {
  // Listando agendamentos do usuário
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },

      // Ordenando os agendamentos por data
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      /* Quantos registros quero pular, para exibir na page,
      se estiver na página 2, pula os primeiros 20 registros e exibir a partir do 21 */

      // Incluindo os dados do prestador
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          // Avatar
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'], // Como a url depende da variável path, precisa ser passada aqui tmb
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  // Criando agendamentos
  async store(req, res) {
    // Validando os dados de entrada
    const schema = Yup.object().shape({
      provider_id: Yup.number()
        .integer()
        .required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // Check date
    const hourStart = startOfHour(parseISO(date)); // Transforma o horário em um objetoe e pega apenas a hora

    if (isBefore(hourStart, new Date())) {
      // Verificando se já passou da data atual
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    // Verificando se o horário do prestador já está ocupado
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      // O horário não está vago
      return res
        .status(400)
        .json({ error: 'Appointment date is not availability' });
    }

    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You cannot schedule with yourself' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    // Notificando o provider
    const user = await User.findByPk(req.userId);

    /* Formatando a data */
    const formattedDate = format(hourStart, "dd 'de 'MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agedamento de ${user.name}, para o dia ${formattedDate}`,
      user: provider_id, // Qual o usuário irá receber a notificação
    });

    return res.json(appointment);
  }

  // Cancelando/deletando um agendamento
  async delete(req, res) {
    // Deletado através do id do agendamento
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{ model: User, as: 'provider', attributes: ['name', 'email'] }],
    });

    if (appointment.user_id !== req.userId) {
      // Se não for o dono do agendamento, não pode cancelar
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment",
      });
    }

    // Verifica se o usuário está a menos de 2h
    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours in advance' });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    // Enviando o email
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      text: 'Você tem um novo cancelamento',
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
