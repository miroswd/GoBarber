import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // Método que chama automaticamente o sequelize
    super.init(
      {
        // Enviando as colunas (que serão inseridas pelo usuário) através de um objeto
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    ); // Chamando o init da classe Model
  }
}

export default User;
