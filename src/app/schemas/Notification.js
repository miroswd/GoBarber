import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    // Definindo os principais campos do schema - quais campos podem ser adicionados
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number, // id
      required: true,
    },
    read: {
      // Se a notificação foi lida
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // created_at e updated_at
);

export default mongoose.model('Notification', NotificationSchema); // Não precisa fazer a conexão no index
