import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // Método que chama automaticamente o sequelize
    super.init(
      {
        // Enviando as colunas (que serão inseridas pelo usuário) através de um objeto
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Só existirá no código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    ); // Chamando o init da classe Model

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this; // Retorna o model que acabou de ser inicializado
    /* trechos de código que são executados
    automaticamente, baseado em ações q acontecem no model
    */
  }
}

export default User;
