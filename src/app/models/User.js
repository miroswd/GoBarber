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
    /* trechos de código que são executados
    automaticamente, baseado em ações q acontecem no model
    */

    return this; // Retorna o model que acabou de ser inicializado
  }

  // Salvando o id do file na tabela users
  static associate(models) {
    this.belongsTo(
      models.File,
      /* pertence a */ {
        foreignKey:
          'avatar_id' /* Qual o nome da coluna q vai armazenar a referência do arquivo */,
        as: 'avatar', // Codenome, para retornar para o frontend
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // Return true or false
  }
}

export default User;
