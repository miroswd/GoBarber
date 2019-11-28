import Sequelize from 'sequelize';

// Importando as credenciais
import databaseConfig from '../config/database';

// Importando os models
import User from '../app/models/User';

const models = [User]; // Armazena todos os models

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Método que irá fazer a conexão com o database
    this.connection = new Sequelize(databaseConfig); // já tenho a conexão

    // Percorrendo o array, retornando cada model
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
